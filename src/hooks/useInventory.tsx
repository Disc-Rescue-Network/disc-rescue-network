import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, Disc } from "../App";
import { DateTime } from "luxon";

interface InventoryHook {
  inventory: Disc[];
  errorMessage: string;
  showErrorMessage: boolean;
  fetchInventory: (course?: string) => void;
  loading: boolean;
}

const convertToEST = (httpTimestamp: string) => {
  console.log("Converting timestamp:", httpTimestamp);
  const dateUTC = DateTime.fromHTTP(httpTimestamp, { zone: "utc" });
  console.log("Converted to UTC:", dateUTC);
  return dateUTC.toFormat("yyyy-MM-dd");
};

export const useInventory = (): InventoryHook => {
  const [inventory, setInventory] = useState<Disc[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const fetchInventory = async (course?: string) => {
    try {
      const params = course ? { course } : {};
      let allItems: Disc[] = [];
      let currentPage = 1;
      let hasNextPage = true;

      while (hasNextPage) {
        const response = await axios.get(
          `${API_BASE_URL}/inventory?pageSize=100&page=${currentPage}`,
          { params }
        );

        const discResponse = response.data.data.items;
        allItems = [...allItems, ...discResponse]; // Add items from current page to the total list

        // Check if there is a next page
        hasNextPage = response.data.data.hasNextPage;
        currentPage += 1; // Increment page number for the next request
      }

      console.log("Full Inventory response:", allItems);
      setInventory(allItems);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setErrorMessage(
        `Error fetching inventory: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      setShowErrorMessage(true);
      setLoading(false);
    }
  };

  return {
    inventory,
    errorMessage,
    showErrorMessage,
    fetchInventory,
    loading,
  };
};
