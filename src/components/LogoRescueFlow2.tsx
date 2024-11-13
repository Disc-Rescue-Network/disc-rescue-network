import "../styles/rescueFlow.css";
import LogoRescue from "../assets/newAssets/centerwrap_logo.png";

const LogoRescueFlow = () => {
  const handleLogoClick = () => {
    //go back to root page when logo is clicked
    window.location.href = "/";
  };
  return (
    <div className="Logo-rescue-store">
      <img
        className="icon-logo-store"
        src={LogoRescue}
        alt="Logo Rescue Flow"
        onClick={handleLogoClick}
      />
    </div>
  );
};

export default LogoRescueFlow;
