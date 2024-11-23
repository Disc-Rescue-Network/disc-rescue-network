import { useEffect, useState } from "react";
import "../styles/searchInventorySidebar.css";
import { Disc } from "../App";
import { useLocation } from "react-router-dom";
import React from "react";
import { useInventoryContext } from "../hooks/useInventory";

interface SearchInventorySidebarProps {
  isOpen: boolean;
  onFilter: (filters: FilterCriteria) => void;
  onReset: () => void;
  onSortChange: (sort: string) => void;
  currentSort: string;
  onClose: () => void;
}

interface FilterCriteria {
  brands: string[];
  colors: string[];
  discNames: string[];
}

type SectionType = "brand" | "color" | "discName";

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
  onClose,
}: SearchInventorySidebarProps) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("course");

  const [filteredDiscs, setFilteredDiscs] = useState<Disc[]>([]);
  const [brands, setBrands] = useState<{ brand: string; count: number }[]>([]);
  const [colors, setColors] = useState<{ color: string; count: number }[]>([]);
  const [discNames, setDiscNames] = useState<
    { discName: string; count: number }[]
  >([]);
  const [activeSections, setActiveSections] = useState<SectionType[]>([
    "brand",
    "color",
    "discName",
  ]);

  const [selectedFilters, setSelectedFilters] = useState<FilterCriteria>({
    brands: [],
    colors: [],
    discNames: [],
  });

  const { inventory, loading } = useInventoryContext();

  const filterDiscs = (
    discs: Disc[],
    courseId: string | null,
    filters: FilterCriteria
  ) => {
    let filteredDiscs = courseId
      ? discs.filter((disc) => disc.course.name === courseId)
      : discs;

    if (filters.brands.length > 0) {
      filteredDiscs = filteredDiscs.filter((disc) =>
        filters.brands.includes(disc.disc.brand.name || "")
      );
    }
    if (filters.colors.length > 0) {
      filteredDiscs = filteredDiscs.filter((disc) =>
        filters.colors.includes(disc.color || "")
      );
    }
    if (filters.discNames.length > 0) {
      filteredDiscs = filteredDiscs.filter((disc) =>
        filters.discNames.includes(disc.disc.brand.name || "")
      );
    }

    setFilteredDiscs(filteredDiscs);
    processFilters(filteredDiscs);
  };

  const processFilters = (discs: Disc[]) => {
    // Process brands
    const brands = getUniqueValues(
      filteredDiscs.map((disc) => disc.disc.brand.name || "")
    );
    const brandCounts = countOccurrences(
      filteredDiscs.map((disc) => disc.disc.brand.name || "")
    );
    const brandsWithCounts = brands.map((brand) => ({
      brand: brand || "Brand not Listed",
      count: brandCounts[brand] || 0,
    }));
    setBrands(brandsWithCounts);

    // Process colors
    const colors = getUniqueValues(filteredDiscs.map((disc) => disc.color));
    const colorCounts = countOccurrences(
      filteredDiscs.map((disc) => disc.color)
    );
    const colorsWithCounts = colors.map((color) => ({
      color: color || "No Color Listed",
      count: colorCounts[color] || 0,
    }));
    setColors(colorsWithCounts);

    // Process disc names
    const discNames = getUniqueValues(
      filteredDiscs.map((disc) => disc.disc.name)
    );
    const discNameCounts = countOccurrences(
      filteredDiscs.map((disc) => disc.disc.name)
    );
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

  const handleFilterSearch = (filterType: string, value: string) => {
    const newFilters = { ...selectedFilters };
    if (filterType === "brand") {
      newFilters.brands = newFilters.brands.includes(value)
        ? newFilters.brands.filter((brand) => brand !== value)
        : [...newFilters.brands, value];
    } else if (filterType === "color") {
      newFilters.colors = newFilters.colors.includes(value)
        ? newFilters.colors.filter((color) => color !== value)
        : [...newFilters.colors, value];
    } else if (filterType === "discName") {
      newFilters.discNames = newFilters.discNames.includes(value)
        ? newFilters.discNames.filter((discName) => discName !== value)
        : [...newFilters.discNames, value];
    }

    setSelectedFilters(newFilters);
    filterDiscs(inventory, courseId, newFilters);

    onFilter(newFilters);
  };

  const resetFilters = () => {
    const initialFilters: FilterCriteria = {
      brands: [],
      colors: [],
      discNames: [],
    };

    filterDiscs(inventory, courseId, initialFilters);

    setSelectedFilters(initialFilters);
    const selectedInputs = document.querySelectorAll<HTMLInputElement>(
      "input[type=checkbox]:checked"
    );
    selectedInputs.forEach((input) => (input.checked = false));
    onReset();
  };

  useEffect(() => {
    filterDiscs(inventory, courseId, selectedFilters);
  }, [inventory, selectedFilters, courseId]);

  const toggleSection = (section: SectionType) => {
    setActiveSections((prevState) =>
      prevState.includes(section)
        ? prevState.filter((activeSection) => activeSection !== section)
        : [...prevState, section]
    );
  };

  return (
    <div className={`asidebar ${isOpen ? "open-sidebar" : ""}`}>
      <div className="sidebar-header">
        <h2>FILTER AND SORT</h2>
      </div>
      <div className="filter-body">
        <div className="close-button">
          <button className="close-sidebar-button" onClick={onClose}>
            x
          </button>
          <div className="sort-toggle">
            <label className="switch-label">Desc</label>
            <label className="switch">
              <input
                type="checkbox"
                id="sortToggle"
                onChange={handleSortToggle}
              />
              <span className="slider round"></span>
            </label>
            <label className="switch-label">Asc</label>
          </div>
        </div>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className={`accordion-button ${
                  activeSections.includes("brand") ? "expanded" : ""
                }`}
                type="button"
                onClick={() => toggleSection("brand")}
                aria-expanded={activeSections.includes("brand")}
                aria-controls="collapseOne"
              >
                Disc Brand
              </button>
            </h2>
            <div
              id="collapseOne"
              className={`accordion-collapse collapse ${
                activeSections.includes("brand") ? "show" : ""
              }`}
              aria-labelledby="headingOne"
            >
              <div className="accordion-body">
                <ul id="brandList">
                  {brands.map((brand, index) => (
                    <li key={index}>
                      <label className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter_brand"
                          value={brand.brand}
                          checked={selectedFilters.brands.includes(brand.brand)}
                          onChange={() =>
                            handleFilterSearch("brand", brand.brand)
                          }
                        />
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
                className={`accordion-button ${
                  activeSections.includes("color") ? "expanded" : ""
                }`}
                type="button"
                onClick={() => toggleSection("color")}
                aria-expanded={activeSections.includes("color")}
                aria-controls="collapseTwo"
              >
                Disc Color
              </button>
            </h2>
            <div
              id="collapseTwo"
              className={`accordion-collapse collapse ${
                activeSections.includes("color") ? "show" : ""
              }`}
              aria-labelledby="headingTwo"
            >
              <div className="accordion-body">
                <ul id="colorList">
                  {colors.map((color, index) => (
                    <li key={index}>
                      <label className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter_color"
                          value={color.color}
                          checked={selectedFilters.colors.includes(color.color)}
                          onChange={() =>
                            handleFilterSearch("color", color.color)
                          }
                        />
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
                className={`accordion-button ${
                  activeSections.includes("discName") ? "expanded" : ""
                }`}
                type="button"
                onClick={() => toggleSection("discName")}
                aria-expanded={activeSections.includes("discName")}
                aria-controls="collapseThree"
              >
                Disc Name
              </button>
            </h2>
            <div
              id="collapseThree"
              className={`accordion-collapse collapse ${
                activeSections.includes("discName") ? "show" : ""
              }`}
              aria-labelledby="headingThree"
            >
              <div className="accordion-body">
                <ul id="discList">
                  {discNames.map((discName, index) => (
                    <li key={index}>
                      <label className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter_discName"
                          value={discName.discName}
                          checked={selectedFilters.discNames.includes(
                            discName.discName
                          )}
                          onChange={() =>
                            handleFilterSearch("discName", discName.discName)
                          }
                        />
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
          <a
            href="javascript:void(0);"
            className="filter-reset"
            onClick={resetFilters}
          >
            Reset Filters
          </a>
        </div>
      </div>
    </div>
  );
}
