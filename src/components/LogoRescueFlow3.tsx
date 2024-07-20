import "../styles/rescueFlow.css"
import LogoRescue from "../assets/newAssets/logomark_transparent.png"

const LogoRescueFlow3 = () => {
    const handleLogoClick = () => {
        window.location.reload();
      };
    return (
        <div  className="Logo-rescue-search-inventory">
            <img 
                className="icon-logo-rescue-search-inventory" 
                src={LogoRescue} 
                alt="Logo Rescue Flow" 
                onClick={handleLogoClick}
            />
        </div>
    )
}

export default LogoRescueFlow3; 