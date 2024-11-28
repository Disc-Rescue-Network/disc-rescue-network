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

const getCounts = (items: string[]): Record<string, number> =>
  items.reduce((counts, item) => {
    counts[item] = (counts[item] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

const processFilterData = (
  discs: Disc[],
  key: "color" | "discName" | "brand"
) => {
  const values = discs
    .map((disc) => {
      if (key === "color") return disc.color;
      if (key === "discName") return disc.disc.name;
      if (key === "brand") return disc.disc.brand.name;
      return null;
    })
    .filter((value): value is string => typeof value === "string");

  console.log("values after filtering", values);

  const counts = getCounts(values);
  console.log("counts", counts);
  return Object.entries(counts).map(([value, count]) => ({
    value,
    count,
  }));
};

const renderSkeletonLabels = (count: number) => {
  return (
    <ul className="skeleton-labels">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index} className="skeleton-label"></li>
      ))}
    </ul>
  );
};

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
  const courseName = queryParams.get("course");

  const { inventory, loading } = useInventoryContext();

  const [filteredDiscs, setFilteredDiscs] = useState<Disc[]>([]);
  const [filterOptions, setFilterOptions] = useState<{
    brands: { value: string; count: number }[];
    colors: { value: string; count: number }[];
    discNames: { value: string; count: number }[];
  }>({ brands: [], colors: [], discNames: [] });
  const [selectedFilters, setSelectedFilters] = useState<FilterCriteria>({
    brands: [],
    colors: [],
    discNames: [],
  });
  const [activeSections, setActiveSections] = useState<SectionType[]>([
    "brand",
    "color",
    "discName",
  ]);

  const filterDiscs = () => {
    let filtered = inventory;

    if (courseName) {
      // console.log("Filtering by course", courseName);
      filtered = filtered.filter((disc) => disc.course.name === courseName);
      // console.log("filtered after course", filtered);
    }

    if (selectedFilters.brands.length) {
      // console.log("Filtering by brands", selectedFilters.brands);
      filtered = filtered.filter((disc) =>
        selectedFilters.brands.includes(disc.disc.brand.name || "Unknown")
      );
      //  console.log("filtered after brands", filtered);
    }
    if (selectedFilters.colors.length) {
      filtered = filtered.filter((disc) =>
        selectedFilters.colors.includes(disc.color || "Unknown")
      );
    }
    if (selectedFilters.discNames.length) {
      filtered = filtered.filter((disc) =>
        selectedFilters.discNames.includes(disc.disc.name || "Unknown")
      );
    }
    console.log("filtered after everything", filtered);

    setFilteredDiscs(filtered);
    updateFilterOptions(filtered);
  };

  const updateFilterOptions = (discs: Disc[]) => {
    setFilterOptions({
      brands: processFilterData(discs, "brand"),
      colors: processFilterData(discs, "color"),
      discNames: processFilterData(discs, "discName"),
    });
  };

  const handleFilterChange = (type: SectionType, value: string) => {
    setSelectedFilters((prevFilters) => {
      console.log("prevFilters", prevFilters);
      const updatedFilters = { ...prevFilters };
      const key = `${type}s` as keyof FilterCriteria; // Ensure the key matches FilterCriteria
      console.log("key", key);

      const currentValues = updatedFilters[key] || [];
      console.log("currentValues", currentValues);

      updatedFilters[key] = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      console.log("updatedFilters", updatedFilters);

      return updatedFilters;
    });
  };

  useEffect(() => {
    onFilter(selectedFilters);
  }, [selectedFilters]);

  const resetFilters = () => {
    setSelectedFilters({ brands: [], colors: [], discNames: [] });
    onReset();
  };

  useEffect(() => {
    console.log("filtering discs...");
    console.log("selectedFilters", selectedFilters);
    filterDiscs();
  }, [inventory, selectedFilters, courseName]);

  const toggleSection = (section: SectionType) => {
    setActiveSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

  const showTooltip = (index: number) => {
    setTooltipIndex(tooltipIndex === index ? null : index);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            <label className="switch inventory">
              <input
                type="checkbox"
                id="sortToggle"
                onChange={(e) =>
                  onSortChange(e.target.checked ? "asc" : "desc")
                }
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
                {loading ? (
                  renderSkeletonLabels(5)
                ) : (
                  <ul id="brandList">
                    {filterOptions.brands.map((brand, index) => (
                        <li key={index}>
                          <label className="filter-checkbox">
                            <input
                              type="checkbox"
                              name="filter_brand"
                              value={brand.value}
                              checked={selectedFilters.brands.includes(brand.value)}
                            />
                            <span
                              className="checkmark"
                              onClick={() =>
                                handleFilterChange("brand", brand.value)
                              }
                            ></span>
                            <span className="filter-text">
                              {isMobile ? (
                                brand.value.length > 15 ? (
                                  <>
                                    {brand.value.slice(0, 15)}...
                                    <span
                                      className="info-icon"
                                      onClick={() => showTooltip(index)}
                                      onTouchStart={() => showTooltip(index)}
                                    >
                                      ℹ️
                                    </span>
                                    {tooltipIndex === index && (
                                      <span className="tooltip">
                                        {brand.value}
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  brand.value || "(empty)"
                                )
                              ) : (
                                brand.value || "(empty)"
                              )}
                              <span className="checkcount">
                                ({brand.count || "0"})
                              </span>
                            </span>
                          </label>
                        </li>
                      )
                    )}
                  </ul>
                )}
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
                {loading ? (
                  renderSkeletonLabels(5)
                ) : (
                  <ul id="colorList">
                    {filterOptions.colors.map((color, index) => (
                      <li key={index}>
                        <label className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter_color"
                            value={color.value}
                            checked={selectedFilters.colors.includes(
                              color.value
                            )}
                          />
                          <span
                            className="checkmark"
                            onClick={() =>
                              handleFilterChange("color", color.value)
                            }
                          ></span>
                          <span className="filter-text">
                            {isMobile ? (
                              color.value.length > 15 ? (
                                <>
                                  {color.value.slice(0, 15)}...
                                  <span
                                    className="info-icon"
                                    onClick={() => showTooltip(index)}
                                    onTouchStart={() => showTooltip(index)}
                                  >
                                    ℹ️
                                  </span>
                                  {tooltipIndex === index && (
                                    <span className="tooltip">
                                      {color.value}
                                    </span>
                                  )}
                                </>
                              ) : (
                                color.value || "(empty)"
                              )
                            ) : (
                              color.value || "(empty)"
                            )}
                            <span className="checkcount">
                              ({color.count || "0"})
                            </span>
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
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
                {loading ? (
                  renderSkeletonLabels(5)
                ) : (
                  <ul id="discList">
                    {filterOptions.discNames.map((discName, index) => (
                      <li key={index}>
                        <label className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter_discName"
                            value={discName.value}
                            checked={selectedFilters.discNames.includes(
                              discName.value
                            )}
                          />
                          <span
                            className="checkmark"
                            onClick={() =>
                              handleFilterChange("discName", discName.value)
                            }
                          ></span>
                          <span className="filter-text">
                            {isMobile ? (
                              discName.value.length > 15 ? (
                                <>
                                  {discName.value.slice(0, 15)}...
                                  <span
                                    className="info-icon"
                                    onClick={() => showTooltip(index)}
                                    onTouchStart={() => showTooltip(index)}
                                  >
                                    ℹ️
                                  </span>
                                  {tooltipIndex === index && (
                                    <span className="tooltip">
                                      {discName.value}
                                    </span>
                                  )}
                                </>
                              ) : (
                                discName.value || "(empty)"
                              )
                            ) : (
                              discName.value || "(empty)"
                            )}
                            <span className="checkcount">
                              ({discName.count || "0"})
                            </span>
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
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
