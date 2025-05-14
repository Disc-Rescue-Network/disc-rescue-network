import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFilter,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import RequestCourseComponets from "../components/RequestCourseComponents";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import CourseSection from "../components/CourseSection";
import SearchInventorySidebar from "../components/SearchInventorySidebar";
import { Disc } from "../App";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import { useInventoryContext } from "../hooks/useInventory";
import SkeletonCard from "../components/SkeletonCard";
import { useTitle } from "../hooks/useTitle";
import Button from "../components/Button";
import "../styles/search.css";
import Fuse from "fuse.js";
import DOMPurify from "dompurify";

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
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [displayedDiscs, setDisplayedDiscs] = useState<Disc[]>([]);
  const [shouldPeekSidebar, setShouldPeekSidebar] = useState(false);
  const { inventory, loading } = useInventoryContext();
  useTitle(`Search ${courseName ? `@ ${courseName}` : "Inventory"}`);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const course = params.get("course");
    const query = params.get("query"); // Get the search query parameter

    setCourseName(course ? decodeURIComponent(course) : null);
    setSelectedCourseId(course);

    // Sanitize the query parameter to prevent XSS attacks
    const decodedQuery = query ? decodeURIComponent(query) : null;
    const sanitizedQuery = decodedQuery ? DOMPurify.sanitize(decodedQuery) : null;
    
    setSearchQuery(sanitizedQuery);
    setSearchInputValue(sanitizedQuery || "");
  }, [location.search]);

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

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }

    if (step === 1) {
      navigate("/");
    }
  }, [step, navigate]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  const onClose = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleFilter = useCallback((newFilters: FilterCriteria) => {
    setFilters(newFilters);
    // setIsSidebarOpen(true);
  }, []);

  const handleReset = useCallback(() => {
    setFilters({
      brands: [],
      colors: [],
      discNames: [],
    });
  }, []);

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

  const handleSearchSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      // Only navigate if there's actually a search term
      if (searchInputValue.trim()) {
        const params = new URLSearchParams();
        if (courseName) {
          params.set("course", encodeURIComponent(courseName));
        }
        params.set("query", encodeURIComponent(searchInputValue.trim()));
        navigate(`/searchInventory?${params.toString()}`);
      }
    },
    [navigate, searchInputValue, courseName]
  );

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
  // Function to perform fuzzy search based on user query using Fuse.js
  const performFuzzySearch = (discs: Disc[], query: string): Disc[] => {
    if (!query) return discs;

    console.log("Performing fuzzy search with query:", query);

    // Debug disc data to check structure
    const debugDisc = discs.find(
      (disc) =>
        disc.disc?.name?.toLowerCase().includes("heat") &&
        disc.color?.toLowerCase().includes("blue")
    );

    if (debugDisc) {
      console.log("Found a matching disc in data:", {
        name: debugDisc.disc?.name,
        color: debugDisc.color,
        brand: debugDisc.disc?.brand?.name,
        fullPath: {
          "disc.name": debugDisc.disc?.name,
          "disc.brand.name": debugDisc.disc?.brand?.name,
          color: debugDisc.color,
          "course.name": debugDisc.course?.name,
        },
      });
    } else {
      console.log("No disc with 'heat' name and 'blue' color found in data");
    }

    // Configure Fuse with options for fuzzy matching
    const fuseOptions = {
      includeScore: true, // Include score to sort by relevance
      threshold: 0.4, // Balanced threshold for good matching
      distance: 100, // Allow text to be matched across larger distance in the strings
      keys: [
        // Weight search fields by importance
        { name: "disc.name", weight: 2 }, // Disc name is most important
        { name: "disc.brand.name", weight: 1.5 }, // Brand is important
        { name: "color", weight: 1.5 }, // Color is important
        { name: "course.name", weight: 1 }, // Course location
        { name: "comments", weight: 1 }, // Any descriptive comments
        { name: "phoneNumber", weight: 0.5 }, // Phone number (less relevant for descriptions)
      ],
      minMatchCharLength: 2, // Minimum length of pattern to be matched
      ignoreLocation: true, // Ignore importance of field location/order
      useExtendedSearch: true, // Enable extended search for complex patterns
      findAllMatches: true, // Find all potential matches
      shouldSort: true, // Sort by relevance
    };

    // Initialize Fuse with our disc data and options
    const fuse = new Fuse(discs, fuseOptions);

    // Split the query into individual words
    const queryWords = query.trim().toLowerCase().split(/\s+/);
    console.log("Query words:", queryWords);

    // If we have multiple words, perform a search for each word and combine results
    if (queryWords.length > 1) {
      console.log("Multi-word search detected, performing enhanced search");

      // First try the exact complete phrase to prioritize exact matches
      const exactPhraseResults = fuse.search(query);
      console.log(
        `Results for exact phrase "${query}": ${exactPhraseResults.length} items`
      );

      // Then search for each word individually
      const individualWordResults = queryWords.map((word) => {
        const result = fuse.search(word);
        console.log(`Results for word "${word}": ${result.length} items`);
        return result;
      });

      // Identify items that match multiple search terms
      const itemScores = new Map<
        string,
        { item: Disc; score: number; matchCount: number }
      >();

      // First add exact phrase matches with priority
      exactPhraseResults.forEach((result) => {
        const id = String(result.item.id); // Convert id to string to ensure it works as a Map key
        itemScores.set(id, {
          item: result.item,
          score: (result.score || 1) * 0.5, // Prioritize exact phrase matches
          matchCount: queryWords.length, // Consider it matched all words
        });
      });

      // Then process individual word matches
      individualWordResults.forEach((results) => {
        results.forEach((result) => {
          const id = String(result.item.id); // Convert id to string to ensure it works as a Map key
          if (itemScores.has(id)) {
            // Update existing item to improve score and increase match count
            const existing = itemScores.get(id)!;
            existing.score = Math.min(existing.score, result.score || 1);
            existing.matchCount += 1;
          } else {
            // Add new item
            itemScores.set(id, {
              item: result.item,
              score: result.score || 1,
              matchCount: 1,
            });
          }
        });
      });

      // Convert to array and sort by match count (descending) then score (ascending)
      const combinedResults = Array.from(itemScores.values()).sort((a, b) => {
        // First prioritize items that match more words
        if (b.matchCount !== a.matchCount) {
          return b.matchCount - a.matchCount;
        }
        // Then sort by score (lower is better)
        return a.score - b.score;
      });

      console.log(
        `Combined multi-word search results: ${combinedResults.length} items`
      );

      // Log a sample of the results
      if (combinedResults.length > 0) {
        console.log(
          "Top combined matches:",
          combinedResults.slice(0, 3).map((r) => ({
            name: r.item.disc?.name,
            color: r.item.color,
            brand: r.item.disc?.brand?.name,
            matchCount: r.matchCount,
            score: r.score,
          }))
        );
      }

      return combinedResults.map((r) => r.item);
    }

    // For single word queries, use the standard Fuse search
    const result = fuse.search(query);

    console.log(`Search results for "${query}": ${result.length} items`);
    // Log a few results with scores
    if (result.length > 0) {
      console.log(
        "Top matches with scores:",
        result.slice(0, 3).map((r) => ({
          name: r.item.disc?.name,
          color: r.item.color,
          brand: r.item.disc?.brand?.name,
          score: r.score,
        }))
      );
    }

    // Result is already sorted by score (lower score = better match), just verify it
    const sortedResults = [...result].sort((a, b) => {
      if (a.score === undefined && b.score === undefined) return 0;
      if (a.score === undefined) return 1;
      if (b.score === undefined) return -1;
      return a.score - b.score;
    });

    console.log(
      "Sorted results (first 3):",
      sortedResults.slice(0, 3).map((r) => ({
        name: r.item.disc?.name,
        color: r.item.color,
        brand: r.item.disc?.brand?.name,
        score: r.score,
      }))
    );

    // Return the matched items, sorted by relevance
    return sortedResults.map((item) => item.item);
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
        <p className="course-name-search">{courseName && `@ ${courseName}`}</p>
      </div>{" "}
      {/* Search input form with buttons */}
      <div className="search-input-container">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Search by disc name, brand, color..."
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
          <button type="submit" className="search-button" aria-label="Search">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
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
            Clear Results
          </button>
        </div>
      )}
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
