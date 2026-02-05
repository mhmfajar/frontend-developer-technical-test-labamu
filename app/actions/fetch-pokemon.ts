"use server";

import { MainClient } from "pokenode-ts";
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
