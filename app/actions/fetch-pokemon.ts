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

    return {
      count: listPokemon.count,
      next: listPokemon.next,
      previous: listPokemon.previous,
      result: listPokemon.results.map((item) => {
        const id = Number(item.url.split("/")[6]);

        return {
          id,
          name: item.name,
          image: `https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
        };
      }),
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

    const evolutionChain: { id: number; name: string; image: string }[] = [];
    const currentStep = evolutionData.chain;

    const getPokemonData = (step: ChainLink): void => {
      const id = Number(step.species.url.split("/").filter(Boolean).pop());
      evolutionChain.push({
        id,
        name: step.species.name,
        image: `https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
      });

      if (step.evolves_to.length > 0) {
        for (const nextStep of step.evolves_to) {
          getPokemonData(nextStep);
        }
      }
    };

    getPokemonData(currentStep);

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
