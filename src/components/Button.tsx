import * as React from "react";
import "../styles/globals.css";
import "../styles/button.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  red?: boolean;
  className?: string;
}

export default function Button(props: ButtonProps) {
  const { text, onClick, red, className } = props;
  return (
    <button
      className={`${className} btn ${red ? "red" : "blue"}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
