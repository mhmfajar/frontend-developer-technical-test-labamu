"use client";

import { Search } from "lucide-react";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 md:left-5 md:h-5 md:w-5" />
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-full border-0 bg-white pl-10 pr-4 text-sm text-zinc-900 shadow-md placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-white/30 md:h-12 md:pl-12 md:pr-6"
      />
    </div>
  );
}
