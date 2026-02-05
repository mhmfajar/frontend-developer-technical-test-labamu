"use server";

import { type ChainLink, MainClient } from "pokenode-ts";
import type { PokemonList } from "../types/pokemon";

export async function fetchListPokemon(
  offset = 0,
  limit = 50,
): Promise<PokemonList | null> {
  const api = new MainClient();

  try {
    const listPokemon = await api.pokemon.listPokemons(offset, limit);

    const result = await Promise.all(
      listPokemon.results.map(async (item) => {
        const id = Number(item.url.split("/")[6]);
        const dreamWorldUrl = `https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

        const response = await fetch(dreamWorldUrl, { method: "HEAD" }).catch(
          () => null,
        );

        return {
          id,
          name: item.name,
          image: response?.ok
            ? dreamWorldUrl
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      }),
    );

    return {
      count: listPokemon.count,
      next: listPokemon.next,
      previous: listPokemon.previous,
      result,
    };
  } catch (error) {
    console.error("Error fetching pokemon:", error);
    return null;
  }
}

export async function fetchPokemonById(id: number | string) {
  const api = new MainClient();

  try {
    const pokemon = await api.pokemon.getPokemonById(Number(id));
    const species = await api.pokemon.getPokemonSpeciesById(Number(id));

    const flavorText =
      species.flavor_text_entries
        .find((entry) => entry.language.name === "en")
        ?.flavor_text.replace(/\f/g, " ") || "";

    const evolutionChainId = species.evolution_chain.url
      .split("/")
      .filter(Boolean)
      .pop();
    const evolutionData = await api.evolution.getEvolutionChainById(
      Number(evolutionChainId),
    );

    const getPokemonData = async (
      step: ChainLink,
    ): Promise<{ id: number; name: string; image: string }[]> => {
      const id = Number(step.species.url.split("/").filter(Boolean).pop());
      const dreamWorldUrl = `https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

      const response = await fetch(dreamWorldUrl, { method: "HEAD" }).catch(
        () => null,
      );

      const current = {
        id,
        name: step.species.name,
        image: response?.ok
          ? dreamWorldUrl
          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };

      if (step.evolves_to.length > 0) {
        const nextSteps = await Promise.all(
          step.evolves_to.map((nextStep) => getPokemonData(nextStep)),
        );
        return [current, ...nextSteps.flat()];
      }

      return [current];
    };

    const evolutionChain = await getPokemonData(evolutionData.chain);

    return {
      id: pokemon.id,
      name: pokemon.name,
      image:
        pokemon.sprites.other?.dream_world.front_default ||
        pokemon.sprites.front_default ||
        "",
      types: pokemon.types.map((t) => t.type.name),
      stats: pokemon.stats.map((s) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
      abilities: pokemon.abilities.map((a) => a.ability.name),
      weight: pokemon.weight,
      height: pokemon.height,
      flavorText,
      evolutionChain,
    };
  } catch (error) {
    console.error(`Error fetching pokemon with id ${id}:`, error);
    return null;
  }
}
