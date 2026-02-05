"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface VirtualizedGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  itemHeight?: number;
  itemWidth?: number;
  buffer?: number;
  gap?: number | { mobile?: number; tablet?: number; desktop?: number };
  hasMore?: boolean;
  onLoadMore?: () => void | Promise<void>;
  loadMoreThreshold?: number;
  isLoading?: boolean;
  loadingIndicator?: React.ReactNode;
  className?: string;
  onScroll?: (scrollTop: number) => void;
}

export function VirtualizedGrid<T>({
  items,
  renderItem,
  keyExtractor,
  itemHeight = 256,
  itemWidth = 180,
  buffer = 2,
  gap = 16,
  hasMore = false,
  onLoadMore,
  loadMoreThreshold = 500,
  isLoading = false,
  loadingIndicator,
  className = "",
  onScroll,
}: VirtualizedGridProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [columnCount, setColumnCount] = useState(0);
  const [containerHeight, setContainerHeight] = useState(800);
  const [currentGap, setCurrentGap] = useState(16);

  useEffect(() => {
    const updateLayout = () => {
      if (containerRef.current) {
        const width = window.innerWidth;
        let calculatedGap = typeof gap === "number" ? gap : 16;

        if (typeof gap === "object") {
          if (width < 640) {
            calculatedGap = gap.mobile ?? 16;
          } else if (width < 1024) {
            calculatedGap = gap.tablet ?? 12;
          } else {
            calculatedGap = gap.desktop ?? 12;
          }
        }

        setCurrentGap(calculatedGap);

        const paddingOffset = 32;
        const containerWidth = containerRef.current.clientWidth - paddingOffset;
        const cols = Math.max(1, Math.floor(containerWidth / itemWidth));
        setColumnCount(cols);
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [itemWidth, gap]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const newScrollTop = target.scrollTop;
      setScrollTop(newScrollTop);
      onScroll?.(newScrollTop);

      if (
        hasMore &&
        !isLoading &&
        onLoadMore &&
        target.scrollHeight - target.scrollTop <=
          target.clientHeight + loadMoreThreshold
      ) {
        void onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore, loadMoreThreshold, onScroll],
  );

  const rowCount = columnCount > 0 ? Math.ceil(items.length / columnCount) : 0;
  const totalHeight = rowCount * (itemHeight + currentGap);

  const visibleRange = useMemo(() => {
    if (columnCount === 0) return { start: 0, end: 0 };
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
    const end = Math.min(
      rowCount,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + buffer,
    );
    return { start, end };
  }, [scrollTop, containerHeight, itemHeight, buffer, rowCount, columnCount]);

  const visibleItems = useMemo(() => {
    if (columnCount === 0) return [];
    const rows = [];
    for (let i = visibleRange.start; i < visibleRange.end; i++) {
      const rowStartIndex = i * columnCount;
      const rowItems = items.slice(rowStartIndex, rowStartIndex + columnCount);

      if (rowItems.length === 0) continue;

      rows.push(
        <div
          key={`row-${i}`}
          className="absolute left-0 w-full"
          style={{
            top: i * itemHeight,
            height: itemHeight,
          }}
        >
          <div
            className="grid h-full"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
              gap: `${currentGap}px`,
            }}
          >
            {rowItems.map((item, idx) => {
              const globalIndex = rowStartIndex + idx;
              return (
                <div key={keyExtractor(item, globalIndex)}>
                  {renderItem(item, globalIndex)}
                </div>
              );
            })}
          </div>
        </div>,
      );
    }
    return rows;
  }, [
    visibleRange.start,
    visibleRange.end,
    columnCount,
    items,
    itemHeight,
    currentGap,
    keyExtractor,
    renderItem,
  ]);

  const defaultLoadingIndicator = (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-200 border-t-red-600" />
    </div>
  );

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={`relative overflow-y-auto overflow-x-hidden scrollbar-hide ${className} px-4 py-6 md:px-6 md:pt-4`}
      style={{ height: "calc(100vh - 160px)" }}
    >
      <div style={{ height: totalHeight }} className="relative w-full">
        {visibleItems}
      </div>

      {isLoading && (loadingIndicator || defaultLoadingIndicator)}
    </div>
  );
}
