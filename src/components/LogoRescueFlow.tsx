import "../styles/rescueFlow.css";
import LogoRescue from "../assets/newAssets/Logomark_white.png";

const LogoRescueFlow = () => {
  const handleLogoClick = () => {
    window.location.href = "/";
  };
  return (
    <div className="Logo-rescue">
      <img
        className="icon-logo-rescue"
        src={LogoRescue}
        alt="Logo Rescue Flow"
        onClick={handleLogoClick}
        style={{ marginBottom: "1rem" }}
      />
    </div>
  );
};

export default LogoRescueFlow;
