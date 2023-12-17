import React from "react";

const SearchInventory = () => {
  const goBack = () => {
    // Logic to go back, e.g., navigate back or to a specific route
  };

  const refresh = () => {
    // Refresh logic, e.g., navigate to home or reload the page
  };

  const reportLostDisc = () => {
    // Logic to report lost disc
  };

  const loadMoreDiscs = () => {
    // Logic to load more discs
  };

  const toggleFabMenu = () => {
    // Logic to toggle FAB menu
  };

  const filterSubmitted = () => {
    // Logic when filter is submitted
  };

  const resetFilters = () => {
    // Logic to reset filters
  };

  return (
    <div
      className="main-wrapper"
      style={{ height: "100%", width: "100%", overflow: "hidden" }}
    >
      <section
        className="main-section text-center"
        style={{ paddingBottom: "20px !important", overflow: "hidden" }}
      >
        <div className="container" style={{ overflow: "hidden" }}>
          <i
            className="fa fa-arrow-left"
            style={{
              position: "absolute",
              top: "30px",
              left: "20px",
              fontSize: "30px",
              color: "white",
              padding: "5px",
            }}
            aria-hidden="true"
            onClick={goBack}
          ></i>
          <div className="d-flex align-items-center flex-column text-center mb-2">
            <img
              className="weblogo"
              src="./assets/logo.png"
              alt="logo"
              onClick={refresh}
            />

            <div className="chat-box d-flex align-items-center mt-1">
              <img className="me-2" src="./assets/chat.svg" alt="chat" />
              <h4 className="m-0 me-2 text-white">OPT IN STATUS</h4>
              <h4 className="m-0 confirmd">CONFIRMED</h4>
            </div>
          </div>
          <div className="rescue d-flex align-items-center flex-column text-center mb-2">
            <h3 className="m-0 text-white">
              ALL LOST <span className="fw-light">DISCS</span>
            </h3>
            <p className="course-name" id="sortedLabel"></p>
          </div>
          <div className="filter-button">
            <button className="filter-btn" id="filter-btn">
              Filters
            </button>
          </div>
          <div className="course-section">
            <div className="row"></div>
            <div className="load-more">
              <a
                href="javascript:void(0);"
                onClick={loadMoreDiscs}
                className="more-btn"
              >
                Load More
              </a>
              <div className="no-more-discs hidden">
                That's all we have for now!
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ... rest of your JSX structure */}
    </div>
  );
};

export default SearchInventory;
