import * as React from "react";
import "../globals.css";
import "../styles/button.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  red?: boolean;
  className?: string;
  icon?: string;
  tilt?: boolean;
  border?: boolean;
}

export default function Button(props: ButtonProps) {
  const { text, onClick, red, className, icon, tilt, border } = props;
  const [showIcon, setShowIcon] = React.useState(false);
  const [tiltStyle, setTiltStyle] = React.useState("rotate(30deg)");

  React.useEffect(() => {
    if (icon !== "" && icon !== undefined) {
      console.log("icon is set");
      setShowIcon(true);
    } else {
      console.log("icon is not set");
      setShowIcon(false);
    }
  }, [icon]);

  React.useEffect(() => {
    if (tilt) {
      setTiltStyle("rotate(30deg)");
    } else {
      setTiltStyle("rotate(0deg)");
    }
  }, [tilt]);

  return (
    <button
      className={`${className} btn ${red ? "red" : "blue"} ${
        border ? "" : "no-border"
      } `}
      onClick={onClick}
    >
      {showIcon && (
        <img
          src={icon}
          alt="icon"
          width="18"
          style={{ marginRight: "10px", transform: tiltStyle }}
        />
      )}
      {text}
    </button>
  );
}
