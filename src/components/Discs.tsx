import React, { useRef } from "react";
import "../styles/discs.css";
import "../styles/card-2.css";
import Card from "./Card";
import { Disc } from "../App";
import SkeletonCard from "./SkeletonCard";

interface DiscsProps {
  arrayOfDiscs: Disc[];
  isLoading: boolean;
}

const Discs = ({ arrayOfDiscs, isLoading }: DiscsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="discs">
      {/* <div className="card-container-discs"> */}
      <div className="card-list">
        {!isLoading ? (
          // <div style={{ position: "relative" }}>
          //   <button
          //     className="scroll-button left"
          //     onClick={() => scroll("left")}
          //     aria-label="Scroll Left"
          //   >
          //     &lt;
          //   </button>
          <div className="card-list" ref={scrollRef}>
            {arrayOfDiscs.map((disc) => (
              <Card key={disc.id} disc={disc} showButton={true} />
            ))}
          </div>
        ) : (
          //   <button
          //     className="scroll-button right"
          //     onClick={() => scroll("right")}
          //     aria-label="Scroll Right"
          //   >
          //     &gt;
          //   </button>
          // </div>
          Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default Discs;
