import { useState, useMemo, useCallback, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, Disc, DiscStateString } from "../App";
import { DateTime } from "luxon";

interface InventoryHook {
  inventory: Disc[];
  errorMessage: string;
  showErrorMessage: boolean;
  fetchInventory: (course?: string) => void;
  loading: boolean;
}

// const convertToEST = (httpTimestamp: string) => {
//   const dateUTC = DateTime.fromHTTP(httpTimestamp, { zone: "utc" });
//   return dateUTC.toFormat("yyyy-MM-dd");
// };

// const convertToLocalTime = (httpTimestamp: string) => {
//   const dateUTC = DateTime.fromHTTP(httpTimestamp, { zone: "utc" });
//   return dateUTC.setZone(DateTime.local().zoneName).toFormat("yyyy-MM-dd");
// };

export const useInventory = (): InventoryHook => {
  const [inventory, setInventory] = useState<Disc[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const fetchInventory = useCallback(async (course?: string) => {
    try {
      let allItems: Disc[] = [];
      let currentPage = 1;
      let hasNextPage = true;
      let pageSize = 100;

      while (hasNextPage) {
        const params = course
          ? { course, pageSize, page: currentPage, nonVerified: true }
          : { pageSize, page: currentPage, nonVerified: true };

        const response = await axios.get(`${API_BASE_URL}/inventory`, {
          params,
        });

        const discResponse = response.data.data.items;
        allItems = allItems.concat(discResponse);
        currentPage += 1;
        hasNextPage = response.data.data.hasNextPage;
      }

      // Ensure every disc is unique
      const uniqueItems = Array.from(
        new Map(allItems.map((disc) => [disc.id, disc])).values()
      );

      allItems = uniqueItems.filter(
        (disc) =>
          disc.status !== DiscStateString.Claimed &&
          disc.status !== DiscStateString.Sold &&
          disc.status !== DiscStateString.SoldOffline &&
          disc.status !== DiscStateString.ForSale &&
          disc.status !== DiscStateString.Surrendered
      );

      // allItems = allItems.map((disc) => ({
      //   ...disc,
      //   dateFound: convertToLocalTime(disc.dateFound),
      //   dateClaimed: convertToLocalTime(disc.dateClaimed || ""),
      //   dateSold: convertToLocalTime(disc.dateSold || ""),
      //   dateTexted: convertToLocalTime(disc.dateTexted || ""),
      //   dateOfReminderText: convertToLocalTime(disc.dateOfReminderText || ""),
      //   createdAt: convertToLocalTime(disc.createdAt),
      //   updatedAt: convertToLocalTime(disc.updatedAt),
      // }));

      allItems = allItems.sort((a, b) => b.id - a.id);

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
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchInventory();
    }, 60000); // Fetch inventory every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [fetchInventory]);

  const memoizedInventory = useMemo(() => inventory, [inventory]);

  return {
    inventory: memoizedInventory,
    errorMessage,
    showErrorMessage,
    fetchInventory,
    loading,
  };
};
