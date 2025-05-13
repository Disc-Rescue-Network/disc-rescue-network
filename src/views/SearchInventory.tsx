import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFilter } from "@fortawesome/free-solid-svg-icons";
import RequestCourseComponets from "../components/RequestCourseComponents";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CourseSection from "../components/CourseSection";
import SearchInventorySidebar from "../components/SearchInventorySidebar";
import { Disc } from "../App";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import { useInventoryContext } from "../hooks/useInventory";
import SkeletonCard from "../components/SkeletonCard";
import { useTitle } from "../hooks/useTitle";
import Button from "../components/Button";
import "../styles/search.css";

interface FilterCriteria {
  brands: string[];
  colors: string[];
  discNames: string[];
}

export default function SearchInventory() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<FilterCriteria>({
    brands: [],
    colors: [],
    discNames: [],
  });
  const [currentSort, setCurrentSort] = useState<string>("desc");
  const [courseName, setCourseName] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [displayedDiscs, setDisplayedDiscs] = useState<Disc[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const { inventory, loading } = useInventoryContext();
  const [shouldPeekSidebar, setShouldPeekSidebar] = useState(false);
  useTitle(`Search ${courseName ? `@ ${courseName}` : "Inventory"}`);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const course = params.get("course");
    const query = params.get("query"); // Get the search query parameter

    setCourseName(course ? decodeURIComponent(course) : null);
    setSelectedCourseId(course);
    setSearchQuery(query ? decodeURIComponent(query) : null);
  }, [location.search]);
  useEffect(() => {
    const handleResize = () => {
      // This is still used for the sidebar functionality
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector(".asidebar");
      if (sidebar && !sidebar.contains(event.target as Node) && isSidebarOpen) {
        onClose();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isSidebarOpen]);

  // Add effect for peek animation on first load
  useEffect(() => {
    // Only show peek animation once when the component mounts for the first time
    const hasShownPeek = sessionStorage.getItem("hasShownFilterPeek");

    if (!hasShownPeek) {
      // Show sidebar peek animation after a short delay on first mount
      const timer = setTimeout(() => {
        setShouldPeekSidebar(true);

        // After peeking, hide it again and mark as shown
        const hideTimer = setTimeout(() => {
          setShouldPeekSidebar(false);
          sessionStorage.setItem("hasShownFilterPeek", "true");
        }, 2000); // Match animation duration

        return () => clearTimeout(hideTimer);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }

    if (step === 1) {
      navigate("/");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onClose = () => {
    setIsSidebarOpen(false);
  };

  const handleFilter = (newFilters: FilterCriteria) => {
    setFilters(newFilters);
    // setIsSidebarOpen(true);
  };

  const handleReset = () => {
    setFilters({
      brands: [],
      colors: [],
      discNames: [],
    });
  };

  const handleSortToggle = () => {
    const newSort = currentSort === "newest" ? "oldest" : "newest";
    setCurrentSort(newSort);
  };

  const handleRescueFlowRedirect = () => {
    navigate("/rescueflow", {
      state: {
        initialStep: 2,
        initialCourse: courseName,
      },
    });
  };

  const handleStartRescueFlow = () => {
    // Navigate to the rescue flow wizard starting at step 1 (no course preselected)
    navigate("/rescueflow");
  };

  const [skeletonLength, setSkeletonLength] = useState(6); // Default skeleton count

  useEffect(() => {
    const calculateSkeletonLength = () => {
      const cardWidth = 300; // Width of a single card in pixels
      const cardHeight = 200; // Height of a single card in pixels
      const viewportWidth = window.innerWidth; // Current viewport width
      const viewportHeight = window.innerHeight; // Current viewport height

      const visibleColumns = Math.floor(viewportWidth / cardWidth);
      const visibleRows = Math.floor(viewportHeight / cardHeight);
      const visibleCards = visibleColumns * visibleRows; // Total cards visible

      setSkeletonLength(Math.max(visibleCards, 6)); // At least 6 skeletons
    };

    calculateSkeletonLength();
    window.addEventListener("resize", calculateSkeletonLength); // Recalculate on resize

    return () => window.removeEventListener("resize", calculateSkeletonLength);
  }, []);
  // Function to perform fuzzy search based on user query
  const performFuzzySearch = (discs: Disc[], query: string): Disc[] => {
    if (!query) return discs;

    const lowerQuery = query.toLowerCase().trim();
    const queryWords = lowerQuery.split(/\s+/); // Split by any whitespace

    return discs.filter((disc) => {
      // Search in multiple fields
      const discName = disc.disc?.name?.toLowerCase() || "";
      const brandName = disc.disc?.brand?.name?.toLowerCase() || "";
      const color = disc.color?.toLowerCase() || "";
      const course = disc.course?.name?.toLowerCase() || "";
      const comments = disc.comments?.toLowerCase() || "";
      const phoneNumber = disc.phoneNumber || "";

      // Combined search text from all fields
      const combinedText = `${discName} ${brandName} ${color} ${course} ${comments} ${phoneNumber}`;

      // Check if all query words appear in any of the disc's fields
      return queryWords.every((word) => combinedText.includes(word));
    });
  };

  useEffect(() => {
    if (!loading && inventory.length > 0) {
      let filtered = [...inventory];

      // Apply course filter if selected
      if (courseName) {
        filtered = filtered.filter((disc) => disc.course.name === courseName);
      }

      // Apply search query if provided
      if (searchQuery) {
        filtered = performFuzzySearch(filtered, searchQuery);
      }

      setDisplayedDiscs(filtered);
    }
  }, [inventory, loading, courseName, searchQuery]);
  return (
    <div className={`inner-app-container ${isSidebarOpen ? "open-body" : ""}`}>
      <div className="logo-and-arrow">
        <i
          className="arrow-left-icon-blue"
          style={{ fontSize: "1.5rem" }}
          onClick={handleBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </i>
        <LogoRescueFlow2 />
      </div>
      <div className="search-inventory-componets">
        <RequestCourseComponets
          className="search-inventory-components"
          baseText={"All Lost"}
          lightText={" Discs"}
        />
      </div>
      <div>
        <p className="course-name-search">
          {courseName && `@ ${courseName}`}
          {searchQuery && (courseName ? " • " : "@ ") + `"${searchQuery}"`}
        </p>
      </div>{" "}
      {/* Display search query info if present */}
      {searchQuery && (
        <div className="search-query-info">
          <p>
            Showing results for:{" "}
            <span className="search-highlight">"{searchQuery}"</span>
          </p>
          <button
            className="clear-search-btn"
            onClick={() => {
              navigate(
                "/searchInventory" +
                  (courseName
                    ? `?course=${encodeURIComponent(courseName)}`
                    : "")
              );
            }}
          >
            Clear Search
          </button>
        </div>
      )}
      {/* Conditional display of buttons based on course selection */}
      <div className="wizard-redirect-button">
        {courseName ? (
          <Button
            text="Click here to search"
            red={true}
            className="rescue-flow-redirect-btn margin-top-1"
            onClick={handleRescueFlowRedirect}
          />
        ) : (
          <Button
            text="Search for your disc"
            red={true}
            className="rescue-flow-redirect-btn"
            onClick={handleStartRescueFlow}
          />
        )}
        <div className="filter-button">
          <span className="filter-btn prominent-filter" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faFilter} /> Filters
          </span>
        </div>
      </div>
      {loading || inventory.length === 0 ? (
        <div className="skeleton-cards">
          {Array.from({ length: skeletonLength }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : searchQuery && displayedDiscs.length === 0 ? (
        /* No results state */
        <div className="no-search-results">
          <h3>No discs found</h3>
          <p>Try a different search term or check for spelling errors</p>
          <button
            className="try-again-btn"
            onClick={() => {
              navigate(
                "/searchInventory" +
                  (courseName
                    ? `?course=${encodeURIComponent(courseName)}`
                    : "")
              );
            }}
          >
            Clear Search
          </button>
        </div>
      ) : (
        <>
          {/* Show the number of search results when a query is present */}
          {searchQuery && (
            <div className="search-results-count">
              Found {displayedDiscs.length} disc
              {displayedDiscs.length !== 1 ? "s" : ""}
            </div>
          )}

          <CourseSection
            filters={filters}
            setFilters={setFilters}
            currentSort={currentSort}
            handleSortToggle={handleSortToggle}
            selectedCourseId={selectedCourseId}
            displayedDiscsCards={displayedDiscs}
          />
        </>
      )}
      <SearchInventorySidebar
        isOpen={isSidebarOpen}
        onFilter={handleFilter}
        onReset={handleReset}
        onSortChange={setCurrentSort}
        currentSort={currentSort}
        onClose={onClose}
        shouldPeek={shouldPeekSidebar}
      />
    </div>
  );
}
