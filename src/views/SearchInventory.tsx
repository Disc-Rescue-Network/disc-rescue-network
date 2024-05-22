import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import RequestCourseComponets from "../components/RequestCourseComponents";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CourseSection from "../components/CourseSection";
import SearchInventorySidebar from "../components/SearchInventorySidebar";

interface FilterCriteria {
    brands: string[];
    colors: string[];
    discNames: string[];
  }


export default function SearchInventory () {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filters, setFilters] = useState<FilterCriteria>({
        brands: [],
        colors: [],
        discNames: [],
    });


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

    const handleFilter = (newFilters: FilterCriteria) => {
        setFilters(newFilters);
        setIsSidebarOpen(false);
    };

    const handleReset = () => {
        setFilters({
            brands: [],
            colors: [],
            discNames: [],
        });
    };

    return (
        <div className={`container-search-inventory ${isSidebarOpen ? 'open-body' : ''}`}>
            <i className="arrow-left-icon-search-inventory" onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </i>
            <div className="logo-search-inventory" style={{ marginTop: '1rem'}}>
                <LogoRescueFlow2 />
            </div>
            <div className="search-inventory-componets" style={{ marginTop: '-3.5rem' }}>
                <RequestCourseComponets className={"search-inventory-components"} baseText={"All Lost"} lightText={" Discs"} />
            </div>
            <div className="filter-button">
                <span className="filter-btn"
                  onClick={toggleSidebar}>Filters{" "} </span>
            </div>
            <CourseSection filters={filters} setFilters={setFilters} />
            <SearchInventorySidebar isOpen={isSidebarOpen} onFilter={handleFilter} onReset={handleReset} />
        </div>
    )
}
