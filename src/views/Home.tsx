import * as React from "react";
import "../styles/globals.css";
import { useNavigate } from "react-router";

//This is the actual home page of the app
export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <p>This is the Home page</p>
      <button onClick={() => navigate("/components")}>components page</button>
    </>
  );
}
