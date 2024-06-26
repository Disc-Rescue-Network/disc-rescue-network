import imgLogo from "../assets/newAssets/DRN_Final_NewLogo.png";
import "../styles/fullLogoHeader.css";

const FullLogoHeader = () => {
  const handleLogoClick = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="logo-container">
        <img
          src={imgLogo}
          alt="Disc Rescue Network Logo"
          className="logo"
          onClick={handleLogoClick}
        />
      </div>
    </>
  );
};

export default FullLogoHeader;
