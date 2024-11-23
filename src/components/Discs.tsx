import React from "react";
import "../styles/discs.css";
import Card from "./Card";
import { Disc } from "../App";
import SkeletonCard from "./SkeletonCard";

interface DiscsProps {
  arrayOfDiscs: Disc[];
  isLoading: boolean;
}

const Discs = ({ arrayOfDiscs, isLoading }: DiscsProps) => {
  return (
    <div className="discs">
      <div className="card-container-discs">
        {!isLoading
          ? arrayOfDiscs.map((disc) => (
              <Card key={disc.id} disc={disc} showButton={true} />
            ))
          : Array.from({ length: 5 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
      </div>
    </div>
  );
};

export default Discs;
