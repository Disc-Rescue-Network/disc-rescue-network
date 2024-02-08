import * as React from "react";
import "../styles/globals.css";
import "../styles/button.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  red?: boolean;
}

export default function Button(props: ButtonProps) {
  const { text, onClick, red } = props;
  return (
    <button className={`btn ${red ? "red" : "blue"}`} onClick={onClick}>
      {text}
    </button>
  );
}
