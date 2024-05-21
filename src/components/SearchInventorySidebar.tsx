import "../styles/searchInventorySidebar.css";

interface SearchInventorySidebarProps {
  isOpen: boolean;
}

export default function SearchInventorySidebar({ isOpen }: SearchInventorySidebarProps) {
  return (
    <div className={`asidebar ${isOpen ? "open-sidebar" : ""}`}>
      <div className="sidebar-header">
        <h2>FILTER AND SORT</h2>
      </div>
      <div className="filter-body">
        <div className="sort-toggle">
          <label className="switch-label">Desc</label>
          <label className="switch">
            <input type="checkbox" id="sortToggle" />
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
                <ul id="brandList"></ul>
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
                <ul id="colorList"></ul>
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
                <ul id="discList"></ul>
              </div>
            </div>
          </div>
        </div>
        <div className="filter-footer">
          <a
            href="javascript:void(0);"
            className="filter-search"
            onClick={() => {
              alert("button clicked");
            }}
          >
            {" "}
            Filter and Search{" "}
          </a>

          <a
            href="javascript:void(0);"
            className="filter-reset"
            onClick={() => {
              alert("button clicked");
            }}
          >
            Reset Filters{" "}
          </a>
        </div>
      </div>
    </div>
  );
}
