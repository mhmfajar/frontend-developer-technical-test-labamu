import Image from "next/image";
import Link from "next/link";
import type { PokemonProps } from "../../types/pokemon";

export function PokemonCard({ pokemon }: { pokemon: PokemonProps }) {
  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-md transition-all border border-gray-300 flex flex-col cursor-pointer"
    >
      <div className="relative p-4 flex flex-col flex-1">
        <div className="mb-1 text-right">
          <span className="text-xs font-bold text-zinc-400">
            #{pokemon.id.toString().padStart(4, "0")}
          </span>
        </div>

        <div className="relative mx-auto mb-3 aspect-square w-full max-w-35 flex-1">
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/40 to-transparent" />
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill
            className="relative object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 33vw"
            loading="eager"
          />
        </div>

        <h3 className="text-center text-lg font-bold capitalize text-zinc-900 min-h-7">
          {pokemon.name}
        </h3>
      </div>
    </Link>
  );
}
