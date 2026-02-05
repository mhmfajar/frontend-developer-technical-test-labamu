import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Ruler,
  Weight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPokemonById } from "~/app/actions/fetch-pokemon";

type PageProps = {
  params: Promise<{ id: string }>;
};

const TYPE_COLORS: Record<string, string> = {
  normal: "#AAA67F",
  fire: "#F57D31",
  water: "#6493EB",
  electric: "#F9CF30",
  grass: "#74CB48",
  ice: "#9AD6DF",
  fighting: "#C12239",
  poison: "#A43E9E",
  ground: "#DEC16B",
  flying: "#A891EC",
  psychic: "#FB5584",
  bug: "#A7B723",
  rock: "#B69E31",
  ghost: "#70559B",
  dragon: "#7037FF",
  dark: "#75574C",
  steel: "#B7B9D0",
  fairy: "#E69EAC",
};

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SATK",
  "special-defense": "SDEF",
  speed: "SPD",
};

export default async function PokemonDetailPage({ params }: PageProps) {
  const { id } = await params;
  const pokemon = await fetchPokemonById(id);

  if (!pokemon) {
    notFound();
  }

  const primaryType = pokemon.types[0];
  const typeColor = TYPE_COLORS[primaryType] || "#AAA67F";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: typeColor }}
    >
      <header className="relative p-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-white hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-8 h-8" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white capitalize">
            {pokemon.name}
          </h1>
        </div>
        <span className="text-sm md:text-base font-bold text-white opacity-90">
          #{pokemon.id.toString().padStart(3, "0")}
        </span>
      </header>

      <main className="flex-1 relative flex flex-col mt-4 md:mt-8">
        <div className="relative z-10 flex items-center justify-between px-4 h-48 md:h-64">
          <Link
            href={`/pokemon/${Math.max(1, pokemon.id - 1)}`}
            className="text-white hover:scale-110 transition-transform p-2"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </Link>

          <div className="relative w-48 h-48 md:w-64 md:h-64 -mb-16 md:-mb-24 animate-pop-in">
            <div className="w-full h-full animate-float">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>

          <Link
            href={`/pokemon/${pokemon.id + 1}`}
            className="text-white hover:scale-110 transition-transform p-2"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </Link>
        </div>

        <div className="bg-white mx-auto rounded-t-2xl flex-1 pt-20 md:pt-25 pb-8 px-6 shadow-inner w-full">
          <div className="max-w-xl mx-auto flex flex-col gap-6">
            <div className="flex justify-center gap-3">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="px-4 py-1 rounded-full text-white text-xs font-bold capitalize shadow-sm"
                  style={{ backgroundColor: TYPE_COLORS[type] || "#AAA67F" }}
                >
                  {type}
                </span>
              ))}
            </div>

            <h2
              className="text-center text-lg font-bold"
              style={{ color: typeColor }}
            >
              About
            </h2>

            <div className="grid grid-cols-3 divide-x divide-zinc-200">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-2 text-zinc-900">
                  <Weight className="w-4 h-4" />
                  <span className="text-sm">{pokemon.weight / 10} kg</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-medium">
                  Weight
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 px-2">
                <div className="flex items-center gap-2 text-zinc-900">
                  <Ruler className="w-4 h-4" />
                  <span className="text-sm">{pokemon.height / 10} m</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-medium">
                  Height
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-1">
                <div className="flex flex-col items-center text-zinc-900 leading-tight">
                  {pokemon.abilities.map((ability) => (
                    <span key={ability} className="text-[11px] capitalize">
                      {ability}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-zinc-400 font-medium mt-auto">
                  Moves
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-700 leading-relaxed text-center px-2">
              {pokemon.flavorText}
            </p>

            <div className="flex flex-col gap-4">
              <h3
                className="text-center text-lg font-bold"
                style={{ color: typeColor }}
              >
                Base Stats
              </h3>

              <div className="flex flex-col gap-2">
                {pokemon.stats.map((stat) => (
                  <div key={stat.name} className="flex items-center gap-3">
                    <span
                      className="w-10 text-[10px] font-bold border-r border-zinc-200 pr-2 text-right"
                      style={{ color: typeColor }}
                    >
                      {STAT_LABELS[stat.name] || stat.name}
                    </span>
                    <span className="w-8 text-[11px] text-zinc-900 font-medium">
                      {stat.value.toString().padStart(3, "0")}
                    </span>
                    <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.min(100, (stat.value / 200) * 100)}%`,
                          backgroundColor: typeColor,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {pokemon.evolutionChain && pokemon.evolutionChain.length > 1 && (
              <div className="flex flex-col gap-4">
                <h3
                  className="text-center text-lg font-bold"
                  style={{ color: typeColor }}
                >
                  Evolution Chain
                </h3>
                <div className="flex items-center justify-center gap-2 md:gap-4 overflow-x-auto pb-2 pt-2 scrollbar-hide">
                  {pokemon.evolutionChain.map((evo, index) => (
                    <div key={evo.id} className="flex items-center">
                      <Link
                        href={`/pokemon/${evo.id}`}
                        className={`group flex flex-col items-center p-3 rounded-2xl transition-all hover:bg-zinc-50 ${
                          evo.id === pokemon.id
                            ? "bg-zinc-100 ring-2 ring-offset-2"
                            : ""
                        }`}
                        style={{
                          // @ts-expect-error
                          "--tw-ring-color": typeColor,
                        }}
                      >
                        <div className="relative w-16 h-16 md:w-20 md:h-20 mb-1">
                          <Image
                            src={evo.image}
                            alt={evo.name}
                            fill
                            className="object-contain transition-transform group-hover:scale-110"
                          />
                        </div>
                        <span className="text-[10px] md:text-xs font-bold capitalize text-zinc-900">
                          {evo.name}
                        </span>
                        <span className="text-[9px] text-zinc-400 font-mono">
                          #{evo.id.toString().padStart(3, "0")}
                        </span>
                      </Link>
                      {index < pokemon.evolutionChain.length - 1 && (
                        <div className="flex items-center justify-center px-1">
                          <ChevronRight
                            className="w-4 h-4 md:w-5 md:h-5 opacity-30"
                            style={{ color: typeColor }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
