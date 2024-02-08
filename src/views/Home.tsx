import * as React from "react";
import "../styles/globals.css";
import { useNavigate } from "react-router";
import Button from "../components/Button";

//This is the actual home page of the app
export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <p>This is the Home page</p>
      <Button
        text={"Components"}
        red={true}
        onClick={() => navigate("/components")}
      />
    </>
  );
}
