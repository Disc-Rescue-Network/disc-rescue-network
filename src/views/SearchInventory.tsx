import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import RequestCourseComponets from "../components/RequestCourseComponents";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CourseSection from "../components/CourseSection";
import SearchInventorySidebar from "../components/SearchInventorySidebar";
import { Disc } from "../App";
import LogoRescueFlow3 from "../components/LogoRescueFlow3";

interface FilterCriteria {
    brands: string[];
    colors: string[];
    discNames: string[];
  }


export default function SearchInventory () {
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
    const [displayedDiscs, setDisplayedDiscs] = useState<Disc[]>([])
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    

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

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        setIsSidebarOpen(false)
    };

    const handleFilter = (newFilters: FilterCriteria) => {
        setFilters(newFilters);
        setIsSidebarOpen(true);
    };

    const handleReset = () => {
        setFilters({
            brands: [],
            colors: [],
            discNames: [],
        });
    };

    const handleSortToggle = () => {
        const newSort = currentSort === "asc" ? "desc" : "asc";
        setCurrentSort(newSort);
    };

    return (
        <div className={`container-search-inventory ${isSidebarOpen ? 'open-body' : ''}`}>
            <i className="arrow-left-icon-search-inventory" onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </i>
            <div className={`logo-search-inventory ${isMobile ? 'no-margin' : ''}`} style={{ marginTop: '1rem'}}>
                <LogoRescueFlow3 />
            </div>
            <div className="search-inventory-componets">
                <RequestCourseComponets className="search-inventory-components" baseText={"All Lost"} lightText={" Discs"} />
            </div>
            <div>
                <p className="course-name-search">
                {courseName && `@ ${courseName}`}
                </p>
            </div>
            <div className="filter-button">
                <span className="filter-btn"
                  onClick={toggleSidebar}>Filters{" "} </span>
            </div>
            <CourseSection 
                filters={filters} 
                setFilters={setFilters} 
                currentSort={currentSort} 
                handleSortToggle={handleSortToggle} 
                selectedCourseId={selectedCourseId}  
                displayedDiscsCards={displayedDiscs} 
            />        
            <SearchInventorySidebar 
                isOpen={isSidebarOpen} 
                onFilter={handleFilter} 
                onReset={handleReset} 
                onSortChange={setCurrentSort} 
                currentSort={currentSort} 
                onClose={onClose}
            />
        </div>
    )
}
