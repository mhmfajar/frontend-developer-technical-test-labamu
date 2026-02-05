"use client";

import { ArrowUpDown, Hash, Type } from "lucide-react";

export type SortOption = "id" | "name" | "type";

export function SortDropdown({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
}) {
  const handleClick = () => {
    const options: SortOption[] = ["id", "name"];
    const currentIndex = options.indexOf(value);
    const nextIndex = (currentIndex + 1) % options.length;
    onChange(options[nextIndex]);
  };

  const getSortIcon = () => {
    switch (value) {
      case "id":
        return <Hash className="h-5 w-5 md:h-6 md:w-6" />;
      case "name":
        return <Type className="h-5 w-5 md:h-6 md:w-6" />;
      default:
        return <ArrowUpDown className="h-5 w-5 md:h-6 md:w-6" />;
    }
  };

  const getTooltip = () => {
    switch (value) {
      case "id":
        return "Sort by Number";
      case "name":
        return "Sort by Name";
      default:
        return "Sort";
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-700 shadow-md transition-all hover:scale-105 hover:bg-zinc-50 focus:outline-none focus:ring-4 focus:ring-white/30 md:h-12 md:w-12"
      title={getTooltip()}
      aria-label={getTooltip()}
    >
      {getSortIcon()}
    </button>
  );
}
