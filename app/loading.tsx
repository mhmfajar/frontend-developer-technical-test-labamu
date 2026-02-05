import PokeballLogo from "./components/ui/pokeball-logo";

export default function Loading() {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 rounded-b-[40px] bg-linear-to-b from-red-600 to-red-500 shadow-lg">
        <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
          <div className="mb-6 flex items-center gap-3">
            <PokeballLogo className="h-10 w-10 drop-shadow-md md:h-14 md:w-14" />
            <h1 className="text-2xl font-bold text-white drop-shadow-md md:text-4xl">
              Pokedex
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="h-12 w-full animate-pulse rounded-full bg-white/20 md:h-14" />
            </div>
            <div className="w-auto">
              <div className="h-12 w-12 animate-pulse rounded-full bg-white/20 md:h-14 md:w-14" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 20 }, (_, i) => `skeleton-grid-${i}`).map(
            (key) => (
              <div
                key={key}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-md transition-all border border-gray-300"
              >
                <div className="relative p-4">
                  <div className="mb-1 text-right">
                    <div className="ml-auto h-3 w-12 animate-pulse rounded bg-zinc-200" />
                  </div>

                  <div className="relative mx-auto mb-3 aspect-square w-full max-w-35">
                    <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/40 to-transparent" />
                    <div className="h-full w-full animate-pulse rounded-full bg-zinc-200" />
                  </div>

                  <div className="mx-auto h-5 w-24 animate-pulse rounded bg-zinc-200" />
                </div>
              </div>
            ),
          )}
        </div>
      </main>
    </div>
  );
}
