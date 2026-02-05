"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchListPokemon } from "~/app/actions/fetch-pokemon";
import PokeballLogo from "~/app/components/ui/pokeball-logo";
import { ScrollToTop } from "~/app/components/ui/scroll-to-top";
import { SearchBar } from "~/app/components/ui/search-bar";
import {
  SortDropdown,
  type SortOption,
} from "~/app/components/ui/sort-dropdown";
import { VirtualizedGrid } from "~/app/components/ui/virtualized-grid";
import type { PokemonList, PokemonProps } from "~/app/types/pokemon";
import { PokemonCard } from "./pokemon-card";

export function PokemonDisplay({
  data,
  limit,
}: {
  data: PokemonList;
  limit: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const sortBy = (searchParams.get("sort") as SortOption) || "id";

  const initialPokemon: PokemonProps[] = data.result;
  const initialHasMore = data.next !== null;

  const [pokemon, setPokemon] = useState<PokemonProps[]>(initialPokemon);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);

  const currentFilters = useRef<string>("");
  const filtersString = searchParams.toString();

  useEffect(() => {
    if (filtersString !== currentFilters.current) {
      currentFilters.current = filtersString;
      setPokemon(initialPokemon);
      setHasMore(initialHasMore);
    }
  }, [filtersString, initialPokemon, initialHasMore]);

  const updateUrl = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      const queryString = params.toString();
      router.replace(queryString ? `?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [searchParams, router, pathname],
  );

  const setSortBy = useCallback(
    (newSort: SortOption) => {
      updateUrl({ sort: newSort === "id" ? null : newSort });
    },
    [updateUrl],
  );

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const currentQ = searchParams.get("q") || "";
      if (searchQuery !== currentQ) {
        updateUrl({ q: searchQuery || null });
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, searchParams, updateUrl]);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const data = await fetchListPokemon(pokemon.length, limit);

      if (!data) return;

      setPokemon((prev) => [...prev, ...data.result]);
      setHasMore(data.next !== null);
    } catch (error) {
      console.error("Failed to load more Pokemon:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, limit, hasMore, pokemon.length]);

  const displayedPokemon = useMemo(() => {
    const filtered = pokemon.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return a.id - b.id;
    });
  }, [pokemon, searchQuery, sortBy]);

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 h-40 rounded-b-[40px] bg-linear-to-b from-red-600 to-red-500 shadow-lg">
        <div className="container mx-auto flex h-full flex-col justify-center px-4 md:px-6">
          <div className="mb-4 flex items-center gap-3">
            <PokeballLogo className="h-8 w-8 drop-shadow-md md:h-10 md:w-10" />
            <h1 className="text-xl font-bold text-white drop-shadow-md md:text-2xl">
              Pokedex
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            <div className="w-auto">
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto">
        {displayedPokemon.length > 0 ? (
          <VirtualizedGrid
            items={displayedPokemon}
            renderItem={(item) => <PokemonCard pokemon={item} />}
            keyExtractor={(item) => item.name}
            hasMore={hasMore}
            onLoadMore={loadMore}
            isLoading={isLoading}
            itemHeight={255.5}
            itemWidth={160}
            gap={{ mobile: 16, tablet: 12, desktop: 12 }}
          />
        ) : !isLoading ? (
          <div className="flex h-[calc(100vh-160px)] flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 rounded-full bg-zinc-100 p-6">
              <Search className="h-12 w-12 text-zinc-400" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">
              No Pokemon found
            </h3>
            <p className="mt-2 text-zinc-500">
              Try adjusting your search query or filters.
            </p>
          </div>
        ) : null}
      </main>

      <ScrollToTop />
    </div>
  );
}
