import "../styles/searchInventory.css";
import LogoSearch from "../assets/icon_logo_transparent_fullsize.png";

const SearchAll = () => {
  const handleLogoClick = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="logo-search">
        <img
          className="icon-logo-search"
          src={LogoSearch}
          alt="Logo Search All"
          onClick={handleLogoClick}
        />
      </div>
    </>
  );
};

export default SearchAll;
