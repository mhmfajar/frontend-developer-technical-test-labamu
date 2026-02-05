import Image from "next/image";
import type { Pokemon } from "~/lib/types";

export function PokemonListItem({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl">
      <div className="relative aspect-square w-20 shrink-0">
        <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/40 to-transparent" />
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          fill
          className="relative object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
          sizes="80px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold text-zinc-400 mb-1">
          #{pokemon.id.toString().padStart(4, "0")}
        </div>
        <h3 className="text-xl font-bold capitalize text-zinc-900 truncate">
          {pokemon.name}
        </h3>
      </div>
    </div>
  );
}
