import { useEffect, useState, useCallback } from "react";
import "../styles/courseSection.css";
import { Disc, DiscStateString } from "../App";
import CourseSectionDiscs from "./CourseSectionDiscs";
import React from "react";
import { useInventoryContext } from "../hooks/useInventory";
import DOMPurify from "dompurify";

interface FilterCriteria {
  brands: string[];
  colors: string[];
  discNames: string[];
}

interface CourseSectionProps {
  filters: FilterCriteria;
  setFilters: (filters: FilterCriteria) => void;
  currentSort: string;
  handleSortToggle: () => void;
  selectedCourseId: string | null;
  displayedDiscsCards: Disc[];
}

export default function CourseSection({
  filters,
  currentSort,
  selectedCourseId,
  displayedDiscsCards,
}: CourseSectionProps) {
  if (process.env.NODE_ENV === "development") {
    console.log("displayedDiscsCards", displayedDiscsCards);
    console.log("selectedCourseId", selectedCourseId);
    console.log("filters", filters);
  }

  const [filteredDiscs, setFilteredDiscs] = useState<Disc[]>([]);
  const [displayedDiscs, setDisplayedDiscs] = useState<Disc[]>([]);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const { inventory, loading } = useInventoryContext(); // Function to calculate initial visible count based on viewport
  const calculateInitialVisibleCount = useCallback(() => {
    const cardWidth = 300; // Width of a single card in pixels
    const cardHeight = 200; // Height of a single card in pixels
    const viewportWidth = window.innerWidth; // Current viewport width
    const viewportHeight = window.innerHeight; // Current viewport height

    const visibleColumns = Math.floor(viewportWidth / cardWidth);
    const visibleRows = Math.floor(viewportHeight / cardHeight);
    const visibleCards = visibleColumns * visibleRows; // Total cards visible

    return Math.max(visibleCards, 6); // At least 6 skeletons
  }, []);
  // Helper function to apply filters to any disc array without sorting
  // This is no longer needed since filters are applied in SearchInventory.tsx
  // But kept for backward compatibility
  const applyFiltersToDiscs = useCallback(
    (discs: Disc[]) => {
      // This function is kept for backward compatibility but no longer used
      // All filtering now happens in the SearchInventory component
      return discs;
    },
    [filters, selectedCourseId]
  );
  // Process discs already filtered and sorted by the parent component (SearchInventory)
  const processProvidedDiscs = useCallback(
    (discs: Disc[]) => {
      console.log(
        "Using pre-filtered discs from search results, preserving order:",
        discs.length
      );

      // No need to re-apply filters as they're already applied in SearchInventory.tsx
      const initialVisibleCount = calculateInitialVisibleCount();
      setFilteredDiscs(discs);
      setDisplayedDiscs(discs.slice(0, initialVisibleCount));
      setShowLoadMore(discs.length > initialVisibleCount);
    },
    [calculateInitialVisibleCount]
  );

  // Apply local filtering and sorting when no pre-filtered discs are provided
  const applyFilters = useCallback(() => {
    console.log("Applying local filtering and sorting");
    const filteredDiscs = inventory
      .sort((a, b) => a.id - b.id)
      .filter((disc) => {
        const brand = disc.disc.brand || "";
        const color = disc.color || "";
        const discName = disc.disc.name || "";

        const matchesBrand =
          filters.brands.length === 0 || filters.brands.includes(brand.name);
        const matchesColor =
          filters.colors.length === 0 || filters.colors.includes(color);
        const matchesDiscName =
          filters.discNames.length === 0 ||
          filters.discNames.includes(discName);

        return (
          disc.status === DiscStateString.Unclaimed &&
          matchesBrand &&
          matchesColor &&
          matchesDiscName &&
          (!selectedCourseId || disc.course.name === selectedCourseId)
        );
      });

    const sortedDiscs = filteredDiscs.sort((a, b) => {
      if (currentSort === "asc") {
        return a.disc.name.localeCompare(b.disc.name);
      } else {
        return b.disc.name.localeCompare(a.disc.name);
      }
    });

    const initialVisibleCount = calculateInitialVisibleCount();

    setFilteredDiscs(sortedDiscs);
    setDisplayedDiscs(sortedDiscs.slice(0, initialVisibleCount));
    setShowLoadMore(sortedDiscs.length > initialVisibleCount);
  }, [
    inventory,
    filters,
    currentSort,
    selectedCourseId,
    calculateInitialVisibleCount,
  ]);

  useEffect(() => {
    // If we have pre-filtered discs from parent (search results), use those
    // Otherwise apply local filtering
    if (displayedDiscsCards && displayedDiscsCards.length > 0) {
      processProvidedDiscs(displayedDiscsCards);
    } else {
      applyFilters();
    }
  }, [
    inventory,
    filters,
    currentSort,
    selectedCourseId,
    displayedDiscsCards,
    processProvidedDiscs,
    applyFilters,
  ]);

  const loadMore = useCallback(() => {
    const nextIndex = displayedDiscs.length + calculateInitialVisibleCount();
    const nextDiscs = filteredDiscs.slice(0, nextIndex);

    setDisplayedDiscs(nextDiscs);
    setShowLoadMore(nextIndex < filteredDiscs.length);
  }, [displayedDiscs, filteredDiscs, calculateInitialVisibleCount]);

  return (
    <div className="course-section">
      <CourseSectionDiscs arrayOfDiscs={displayedDiscs} />{" "}
      {showLoadMore && (
        <div className="load-more">
          <button className="more-btn" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
      {displayedDiscs.length === 0 && !loading && (
        <p className="no-results-message">
          No results{" "}
          {selectedCourseId &&
            `for ${DOMPurify.sanitize(decodeURIComponent(selectedCourseId))}`}
        </p>
      )}
    </div>
  );
}
