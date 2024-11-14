import { useEffect, useState } from "react";
import "../styles/courseSection.css";
import { Disc, DiscStateString } from "../App";
import CourseSectionDiscs from "./CourseSectionDiscs";
import { useInventory } from "../hooks/useInventory";
import React from "react";
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
  const [showLoadMore, setShowLoadMore] = useState(true);

  const { inventory, fetchInventory, loading } = useInventory();

  React.useEffect(() => {
    if (inventory.length === 0) {
      //console.log("Fetching inventory");
      fetchInventory();
    }
  }, [inventory]);

  useEffect(() => {
    //console.log("Inventory", inventory);
    applyFilters();
  }, [inventory, filters, currentSort, selectedCourseId]);

  const applyFilters = () => {
    const filteredDiscs = inventory.filter((disc) => {
      //console.log("Applying filters");
      //console.log("selectedCourseId", selectedCourseId);
      //console.log("filters", filters);

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

    //console.log("Sorted discs", sortedDiscs);

    setFilteredDiscs(sortedDiscs);
    setDisplayedDiscs(sortedDiscs.slice(0, 6));
    setShowLoadMore(sortedDiscs.length > 6);
  };

  const loadMore = () => {
    const nextIndex = displayedDiscs.length + 6;
    const nextDiscs = filteredDiscs
      .slice(0, nextIndex)
      .filter((disc) => disc.status === DiscStateString.Unclaimed)
      .slice(0, nextIndex);

    const sortedNextDiscs = nextDiscs.sort((a, b) => {
      if (currentSort === "asc") {
        return a.disc.name.localeCompare(b.disc.name);
      } else {
        return b.disc.name.localeCompare(a.disc.name);
      }
    });

    setDisplayedDiscs(sortedNextDiscs);
    setShowLoadMore(nextIndex < inventory.length);

    if (nextDiscs.length === 0) {
      setDisplayedDiscs([]);
    }
  };

  return (
    <div className="course-section">
      {loading && (
        <div className="card-container-discs">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}
      <CourseSectionDiscs arrayOfDiscs={displayedDiscs} />
      {showLoadMore && (
        <div className="load-more">
          <a className="more-btn" onClick={loadMore}>
            Load More
          </a>
        </div>
      )}
      {displayedDiscs.length === 0 && !loading && (
        <p className="no-results-message">No results for {selectedCourseId}</p>
      )}
    </div>
  );
}
