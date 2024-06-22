import { useEffect, useState } from "react";
import "../styles/searchInventorySidebar.css";
import axios from "axios";
import { Disc } from "../App";
import { useLocation } from "react-router-dom";

interface SearchInventorySidebarProps {
  isOpen: boolean;
  onFilter: (filters: FilterCriteria) => void;
  onReset: () => void;
  onSortChange: (sort: string) => void;
  currentSort: string;
}

interface FilterCriteria {
  brands: string[];
  colors: string[];
  discNames: string[];
}

function countOccurrences(arr: string[]): Record<string, number> {
  return arr.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

function getUniqueValues(arr: string[]): string[] {
  return arr.filter((value, index, self) => self.indexOf(value) === index);
}

export default function SearchInventorySidebar({
  isOpen,
  onFilter,
  onReset,
  onSortChange,
  currentSort,
}: SearchInventorySidebarProps) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("course");

  const [allDiscs, setAllDiscs] = useState<Disc[]>([]);
  const [filteredDiscs, setFilteredDiscs] = useState<Disc[]>([]);
  const [brands, setBrands] = useState<{ brand: string; count: number }[]>([]);
  const [colors, setColors] = useState<{ color: string; count: number }[]>([]);
  const [discNames, setDiscNames] = useState<{ discName: string; count: number }[]>([]);

  useEffect(() => {
    const fetchDiscs = async () => {
      try {
        const response = await axios.get("https://api.discrescuenetwork.com/inventory");
        const discs: Disc[] = response.data;
        setAllDiscs(discs);
        filterDiscs(discs, courseId);
      } catch (error) {
        console.error("Failed to fetch discs:", error);
      }
    };

    fetchDiscs();
  }, [courseId]);

  const filterDiscs = (discs: Disc[], courseId: string | null) => {
    const filteredDiscs = courseId ? discs.filter(disc => disc.course === courseId) : discs;
    setFilteredDiscs(filteredDiscs);
    processFilters(filteredDiscs);
  };

  const processFilters = (discs: Disc[]) => {
    // Process brands
    const brands = getUniqueValues(discs.map((disc) => disc.brand || ""));
    const brandCounts = countOccurrences(discs.map((disc) => disc.brand || ""));
    const brandsWithCounts = brands.map((brand) => ({
      brand: brand || "Brand not Listed",
      count: brandCounts[brand] || 0,
    }));
    setBrands(brandsWithCounts);

    // Process colors
    const colors = getUniqueValues(discs.map((disc) => disc.color));
    const colorCounts = countOccurrences(discs.map((disc) => disc.color));
    const colorsWithCounts = colors.map((color) => ({
      color: color || "No Color Listed",
      count: colorCounts[color] || 0,
    }));
    setColors(colorsWithCounts);

    // Process disc names
    const discNames = getUniqueValues(discs.map((disc) => disc.disc));
    const discNameCounts = countOccurrences(discs.map((disc) => disc.disc));
    const discNamesWithCounts = discNames.map((discName) => ({
      discName: discName || "Disc Name not Listed",
      count: discNameCounts[discName] || 0,
    }));
    setDiscNames(discNamesWithCounts);
  };

  const handleSortToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSort = event.target.checked ? "asc" : "desc";
    onSortChange(newSort);
  };

  const handleFilterSearch = () => {
    const selectedBrands = Array.from(document.querySelectorAll("input[name='filter_brand']:checked")).map(
      (input) => (input as HTMLInputElement).value
    );
    const selectedColors = Array.from(document.querySelectorAll("input[name='filter_color']:checked")).map(
      (input) => (input as HTMLInputElement).value
    );
    const selectedDiscNames = Array.from(document.querySelectorAll("input[name='filter_discName']:checked")).map(
      (input) => (input as HTMLInputElement).value
    );

    const filteredDiscs = allDiscs.filter(
      (disc) =>
        (!courseId || disc.course === courseId) &&
        (selectedBrands.length === 0 || selectedBrands.includes(disc.brand || "")) &&
        (selectedColors.length === 0 || selectedColors.includes(disc.color || "")) &&
        (selectedDiscNames.length === 0 || selectedDiscNames.includes(disc.disc || ""))
    );

    setFilteredDiscs(filteredDiscs);
    processFilters(filteredDiscs);

    onFilter({
      brands: selectedBrands,
      colors: selectedColors,
      discNames: selectedDiscNames,
    });
  };

  const resetFilters = () => {
    const initialFilters: FilterCriteria = {
      brands: [],
      colors: [],
      discNames: [],
    };

    filterDiscs(allDiscs, courseId);

    onFilter(initialFilters);
    const selectedInputs = document.querySelectorAll<HTMLInputElement>("input[type=checkbox]:checked");
    selectedInputs.forEach((input) => (input.checked = false));
    onReset();
  };

  return (
    <div className={`asidebar ${isOpen ? "open-sidebar" : ""}`}>
      <div className="sidebar-header">
        <h2>FILTER AND SORT</h2>
      </div>
      <div className="filter-body">
        <div className="sort-toggle">
          <label className="switch-label">Desc</label>
          <label className="switch">
            <input type="checkbox" id="sortToggle" onChange={handleSortToggle} />
            <span className="slider round"></span>
          </label>
          <label className="switch-label">Asc</label>
        </div>

        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Disc Brand
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
            >
              <div className="accordion-body">
                <ul id="brandList">
                  {brands.map((brand, index) => (
                    <li key={index}>
                      <label className="filter-checkbox">
                        <input type="checkbox" name="filter_brand" value={brand.brand} />
                        <span className="checkmark"></span>
                        <span className="filter-text">
                          {brand.brand}
                          <span className="checkcount">({brand.count})</span>
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                Disc Color
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse show"
              aria-labelledby="headingTwo"
            >
              <div className="accordion-body">
                <ul id="colorList">
                  {colors.map((color, index) => (
                    <li key={index}>
                      <label className="filter-checkbox">
                        <input type="checkbox" name="filter_color" value={color.color} />
                        <span className="checkmark"></span>
                        <span className="filter-text">
                          {color.color}
                          <span className="checkcount">({color.count})</span>
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="true"
                aria-controls="collapseThree"
              >
                Disc Name
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse show"
              aria-labelledby="headingThree"
            >
              <div className="accordion-body">
                <ul id="discList">
                  {discNames.map((discName, index) => (
                    <li key={index}>
                      <label className="filter-checkbox">
                        <input type="checkbox" name="filter_discName" value={discName.discName} />
                        <span className="checkmark"></span>
                        <span className="filter-text">
                          {discName.discName}
                          <span className="checkcount">({discName.count})</span>
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="filter-footer">
          <a href="javascript:void(0);" className="filter-search" onClick={handleFilterSearch}>
            Filter and Search
          </a>
          <a href="javascript:void(0);" className="filter-reset" onClick={resetFilters}>
            Reset Filters
          </a>
        </div>
      </div>
    </div>
  );
}
