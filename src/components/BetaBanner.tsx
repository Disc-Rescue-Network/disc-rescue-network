import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type BetaBanner = {
  Text: string;
  LinkText: String;
  SecondText: String;
};

export default function BetaBanner(props: BetaBanner) {
  const { Text, LinkText, SecondText } = props;
  const [isVisible, setIsVisible] = useState(true);

  const hideBanner = () => {
    setIsVisible(false);
  };

  // We don't persist this state to localStorage
  // It will reset when the page refreshes

  if (!isVisible) {
    return null;
  }

  return (
    <div className="beta-banner">
      <div className="content-beta-banner">
        {Text}
        <a
          href="https://www.discrescuenetwork.com/bugreport"
          target="_blank"
          rel="noreferrer"
        >
          <span>{LinkText}</span>
        </a>
        {SecondText}
      </div>
      {/* <button
        className="close-banner"
        onClick={hideBanner}
        aria-label="Close banner"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button> */}
      <FontAwesomeIcon
        icon={faTimes}
        onClick={hideBanner}
        className="close-banner"
      />
    </div>
  );
}
