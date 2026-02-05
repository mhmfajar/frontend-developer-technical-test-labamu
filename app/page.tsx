import { fetchListPokemon } from "./actions/fetch-pokemon";
import { PokemonDisplay } from "./components/pokemon/pokemon-display";

export default async function Home() {
  const limit = 50;
  const data = await fetchListPokemon(0, limit);

  if (!data) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-zinc-50">
        <p className="text-zinc-600">Failed to load Pokemon data</p>
      </div>
    );
  }

  return <PokemonDisplay data={data} limit={limit} />;
}
