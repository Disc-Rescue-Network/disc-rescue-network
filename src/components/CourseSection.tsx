import { useEffect, useState } from "react";
import "../styles/courseSection.css";
import { Disc, DiscStateString } from "../App";
import CourseSectionDiscs from "./CourseSectionDiscs";
import React from "react";
import { useInventoryContext } from "../hooks/useInventory";
import SkeletonCard from "./SkeletonCard";

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
}: CourseSectionProps) {
  const [filteredDiscs, setFilteredDiscs] = useState<Disc[]>([]);
  const [displayedDiscs, setDisplayedDiscs] = useState<Disc[]>([]);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const { inventory, loading } = useInventoryContext();

  useEffect(() => {
    applyFilters();
  }, [inventory, filters, currentSort, selectedCourseId]);

  const applyFilters = () => {
    const filteredDiscs = inventory.filter((disc) => {
      const brand = disc.disc.brand || "";
      const color = disc.color || "";
      const discName = disc.disc.name || "";

      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(brand.name);
      const matchesColor =
        filters.colors.length === 0 || filters.colors.includes(color);
      const matchesDiscName =
        filters.discNames.length === 0 || filters.discNames.includes(discName);

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
  };

  const calculateInitialVisibleCount = () => {
    const cardWidth = 300; // Width of a single card in pixels
    const cardHeight = 200; // Height of a single card in pixels
    const viewportWidth = window.innerWidth; // Current viewport width
    const viewportHeight = window.innerHeight; // Current viewport height

    const visibleColumns = Math.floor(viewportWidth / cardWidth);
    const visibleRows = Math.floor(viewportHeight / cardHeight);
    const visibleCards = visibleColumns * visibleRows; // Total cards visible

    return Math.max(visibleCards, 6); // At least 6 skeletons
  };

  const loadMore = () => {
    const nextIndex = displayedDiscs.length + calculateInitialVisibleCount();
    const nextDiscs = filteredDiscs.slice(0, nextIndex);

    setDisplayedDiscs(nextDiscs);
    setShowLoadMore(nextIndex < filteredDiscs.length);
  };

  return (
    <div className="course-section">
      <CourseSectionDiscs arrayOfDiscs={displayedDiscs} />
      {showLoadMore && (
        <div className="load-more">
          <button className="more-btn" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
      {displayedDiscs.length === 0 && !loading && (
        <p className="no-results-message">No results for {selectedCourseId}</p>
      )}
    </div>
  );
}
