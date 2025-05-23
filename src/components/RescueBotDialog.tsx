import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/rescueBotDialog.css";
import DOMPurify from "dompurify";

interface RescueBotDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const RescueBotDialog: React.FC<RescueBotDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  // Sample search suggestions
  const suggestions = [
    "Blue Innova Destroyer",
    "Discraft Buzz Maple Hill",
    "Pink disc (999) 999-9999",
  ];
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      // Sanitize the query to prevent XSS attacks
      const sanitizedQuery = DOMPurify.sanitize(searchQuery.trim());

      // Navigate to the search page with the sanitized query parameter
      navigate(`/searchInventory?query=${encodeURIComponent(sanitizedQuery)}`);
      onClose();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    // Automatically search when clicking a suggestion
    setTimeout(() => {
      // Sanitize the suggestion to prevent XSS attacks
      const sanitizedSuggestion = DOMPurify.sanitize(suggestion.trim());

      navigate(
        `/searchInventory?query=${encodeURIComponent(sanitizedSuggestion)}`
      );
      onClose();
    }, 50);
  };

  // Handle escape key to close dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus the input when dialog opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      // Prevent body scrolling when dialog is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Handle clicks outside the dialog to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(e.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div
      className="rescue-bot-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div className="rescue-bot-dialog" ref={dialogRef}>
        <div className="rescue-bot-header">
          <h2 id="dialog-title">Ask Rescue Bot</h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSearch}>
          <div className="search-input-container">
            {" "}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                // Sanitize input value
                const sanitizedValue = DOMPurify.sanitize(e.target.value);
                setSearchQuery(sanitizedValue);
              }}
              placeholder="Describe your disc..."
              className="rescue-bot-input"
              ref={inputRef}
              aria-label="Search input"
            />{" "}
            <button
              type="submit"
              className="search-button-popup"
              aria-label="Search"
            >
              <i
                className="bx bx-search"
                style={{ marginRight: "4px", fontSize: "1.1rem" }}
              ></i>
              Search
            </button>
          </div>
          <div className="search-suggestions">
            <p>Try searching for:</p>
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleSuggestionClick(suggestion);
                    }
                  }}
                  aria-label={`Search for ${suggestion}`}
                >
                  <span className="suggestion-text">"{suggestion}"</span>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RescueBotDialog;
