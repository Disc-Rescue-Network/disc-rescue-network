import * as React from "react";
import "../styles/globals.css";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import PopUpComponent from "../components/PopUpComponent";

//This is the actual home page of the app
export default function Home() {
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = React.useState(true);

  function closePopup() {
    setIsPopupOpen(false);
  }

  return (
    <>
       {isPopupOpen && (
        <PopUpComponent
          title={"WHAT IS THE"}
          redText={" RESCUE FLOW?"}
          content={"THE RESCUE FLOW IS A SIMPLE 5 STEP PROCESS USED TO LOCATE YOUR LOST DISC. AT EACH STAGE WE GATHER SOME INFORMATION FROM YOU THAT COULD HAVE BEEN REPORTED BY VOLUNTEERS TO FIND YOUR DISC IN OUR SYSTEM. THE FLOW WILL TAKE YOU THROUGH THE SYSTEM WE DESIGNED TO EASILY, AND QUICKLY, FIND YOUR DISC IF IT’S IN THE NETWORK OR REPORT IT IF IT ISN’T."}
          onClose={closePopup}
        />
      )}
      <p>This is the Home page</p>
      <Button
        text={"Components"}
        red={true}
        onClick={() => navigate("/components")}
      />
    </>
  );
}
