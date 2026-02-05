import type { NamedAPIResourceList } from "pokenode-ts";

export type PokemonProps = {
  id: number;
  name: string;
  image: string;
};

export type PokemonList = Omit<NamedAPIResourceList, "results"> & {
  result: PokemonProps[];
};
