import "../styles/rescueFlow.css"
import LogoRescue from "../assets/icon_logo_transparent_300x300_secondary.png"

const LogoRescueFlow = () => {
    const handleLogoClick = () => {
        window.location.reload();
      };
    return (
        <div  className="Logo-rescue">
            <img 
                className="icon-logo-rescue" 
                src={LogoRescue} 
                alt="Logo Rescue Flow" 
                onClick={handleLogoClick}
            />
        </div>
    )
}

export default LogoRescueFlow; 