import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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
  const [displayedDiscs, setDisplayedDiscs] = useState<Disc[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const { inventory, loading } = useInventoryContext();
  useTitle(`Search ${courseName ? `@ ${courseName}` : "Inventory"}`);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const course = params.get("course");
    setCourseName(course ? decodeURIComponent(course) : null);
    setSelectedCourseId(course);
  }, [location.search]);

  useEffect(() => {
    const handleResize = () => {
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
      </div>
      <div className="filter-button">
        <span className="filter-btn" onClick={toggleSidebar}>
          Filters
        </span>
      </div>
      {loading || inventory.length === 0 ? (
        <div className="skeleton-cards">
          {Array.from({ length: skeletonLength }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <CourseSection
          filters={filters}
          setFilters={setFilters}
          currentSort={currentSort}
          handleSortToggle={handleSortToggle}
          selectedCourseId={selectedCourseId}
          displayedDiscsCards={displayedDiscs}
        />
      )}
      <SearchInventorySidebar
        isOpen={isSidebarOpen}
        onFilter={handleFilter}
        onReset={handleReset}
        onSortChange={setCurrentSort}
        currentSort={currentSort}
        onClose={onClose}
      />
    </div>
  );
}
