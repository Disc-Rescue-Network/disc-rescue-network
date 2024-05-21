import { useEffect, useState } from "react";
import "../styles/courseSection.css"
import axios from "axios";
import { Disc, DiscStateString } from "../App";
import CourseSectionDiscs from "./CourseSectionDiscs";
import SearchInventorySidebar from "./SearchInventorySidebar";

export default function CourseSection () {
    const [allDiscs, setAllDiscs] = useState<Disc[]>([]);
    const [displayedDiscs, setDisplayedDiscs] = useState<Disc[]>([]);
    const [showLoadMore, setShowLoadMore] = useState(true);
  
    useEffect(() => {
      const fetchDiscs = async () => {
        try {
          const response = await axios.get(
            "https://api.discrescuenetwork.com/inventory"
          );
          setAllDiscs(response.data); // Assuming the API response directly contains the array of discs
        } catch (error) {
          console.error("Failed to fetch discs:", error);
        }
      };
  
      fetchDiscs();
    }, []);
  
    useEffect(() => {
      // Filter by status
      const filteredDiscs = allDiscs.filter(
        (disc) =>
          disc.status === DiscStateString.New ||
          disc.status === DiscStateString.Unclaimed
      );
      setDisplayedDiscs(filteredDiscs.slice(0, 6)); 
      setShowLoadMore(filteredDiscs.length > 6); 
    }, [allDiscs]);
  
    const loadMore = () => {
      const nextIndex = displayedDiscs.length + 6;
      const nextDiscs = allDiscs.filter(
        (disc) =>
          disc.status === DiscStateString.New ||
          disc.status === DiscStateString.Unclaimed
      ).slice(0, nextIndex);
      setDisplayedDiscs(nextDiscs);
      setShowLoadMore(nextIndex < allDiscs.length);
    };
  
    return (
      <div className="course-section">
        <CourseSectionDiscs arrayOfDiscs={displayedDiscs} />
        {showLoadMore && (
          <div className="load-more"> 
            <a 
                className="more-btn" 
                onClick={loadMore}>
                Load More
            </a>
          </div>
        )}
      </div>
    );
  }