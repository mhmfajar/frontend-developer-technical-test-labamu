import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-200 animate-pulse">
      <header className="relative p-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-white hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-8 h-8" />
          </Link>
          <div className="h-8 w-32 bg-white/30 rounded-lg" />
        </div>
        <div className="h-5 w-12 bg-white/30 rounded" />
      </header>

      <main className="flex-1 relative flex flex-col mt-4 md:mt-8">
        <div className="absolute top-0 right-4 w-64 h-64 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
            <title>Pokeball decoration</title>
            <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 88C29 88 12 71 12 50c0-1.6.1-3.2.3-4.8h26.4c1.8 5.6 7.1 9.6 13.3 9.6s11.5-4 13.3-9.6h26.4c.2 1.6.3 3.2.3 4.8 0 21-17 38-38 38zM87.7 44H61.3c-1.8-5.6-7.1-9.6-13.3-9.6s-11.5 4-13.3 9.6H12.3c3.4-18.4 18.2-32.8 36.7-33.7V25h2V10.3c18.5.9 33.3 15.3 36.7 33.7zM50 40c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10z" />
          </svg>
        </div>

        <div className="relative z-10 flex items-center justify-between px-4 h-48 md:h-64">
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white opacity-50" />
          <div className="relative w-48 h-48 md:w-64 md:h-64 -mb-16 md:-mb-24 bg-white/20 rounded-full" />
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white opacity-50" />
        </div>

        <div className="bg-white mx-auto rounded-t-2xl flex-1 pt-20 md:pt-25 pb-8 px-6 shadow-inner w-full">
          <div className="max-w-xl mx-auto flex flex-col gap-8">
            <div className="flex justify-center gap-3">
              <div className="h-6 w-20 bg-zinc-100 rounded-full" />
              <div className="h-6 w-20 bg-zinc-100 rounded-full" />
            </div>

            <div className="mx-auto h-6 w-24 bg-zinc-100 rounded" />

            <div className="grid grid-cols-3 divide-x divide-zinc-100">
              <div className="flex flex-col items-center gap-2">
                <div className="h-5 w-16 bg-zinc-100 rounded" />
                <div className="h-3 w-10 bg-zinc-50 rounded" />
              </div>
              <div className="flex flex-col items-center gap-2 px-2">
                <div className="h-5 w-16 bg-zinc-100 rounded" />
                <div className="h-3 w-10 bg-zinc-50 rounded" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-5 w-16 bg-zinc-100 rounded" />
                <div className="h-3 w-10 bg-zinc-50 rounded" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-4 w-full bg-zinc-100 rounded" />
              <div className="h-4 w-5/6 mx-auto bg-zinc-100 rounded" />
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <div className="mx-auto h-6 w-32 bg-zinc-100 rounded mb-2" />
              {Array.from({ length: 6 }, (_, i) => `stat-skeleton-${i}`).map(
                (key) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className="w-10 h-3 bg-zinc-100 rounded" />
                    <div className="w-8 h-3 bg-zinc-100 rounded" />
                    <div className="flex-1 h-2 bg-zinc-50 rounded-full" />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
