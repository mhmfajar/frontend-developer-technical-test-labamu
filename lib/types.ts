export type Pokemon = {
  id: number;
  name: string;
  image: string;
};

export type ViewMode = "grid" | "list";

export type PokemonSearchParams = {
  search?: string;
  type?: string;
  sort?: "number" | "name";
  offset?: number;
  limit?: number;
};
