import { useState } from "react";
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

const convertToEST = (httpTimestamp: string) => {
  //console.log("Converting timestamp:", httpTimestamp);
  const dateUTC = DateTime.fromHTTP(httpTimestamp, { zone: "utc" });
  //console.log("Converted to UTC:", dateUTC);
  return dateUTC.toFormat("yyyy-MM-dd");
};

const convertToLocalTime = (httpTimestamp: string) => {
  const dateUTC = DateTime.fromHTTP(httpTimestamp, { zone: "utc" });
  return dateUTC.setZone(DateTime.local().zoneName).toFormat("yyyy-MM-dd");
};

const CACHE_KEY = "inventoryCache";
const CACHE_TIMESTAMP_KEY = "inventoryCacheTimestamp";
const CACHE_DURATION = 60 * 5000; // 5 min in milliseconds
const CACHE_REFRESH_INTERVAL = 60 * 1000; // 1 min in milliseconds

const getCachedInventory = () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
  if (cachedData && cachedTimestamp) {
    const now = Date.now();
    if (now - parseInt(cachedTimestamp, 10) < CACHE_DURATION) {
      return JSON.parse(cachedData);
    }
  }
  return null;
};

const isCacheStale = () => {
  const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
  if (cachedTimestamp) {
    const now = Date.now();
    return now - parseInt(cachedTimestamp, 10) > CACHE_REFRESH_INTERVAL;
  }
  return true;
};

const setCachedInventory = (data: Disc[]) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
};

export const useInventory = (): InventoryHook => {
  const [inventory, setInventory] = useState<Disc[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const fetchInventory = async (course?: string) => {
    const cachedInventory = getCachedInventory();
    if (cachedInventory && !isCacheStale()) {
      setInventory(cachedInventory);
      setLoading(false);
      return;
    }

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

      //console.log("Full Inventory response:", allItems);
      const discsWithClaims = allItems.filter((disc) => disc.claims.length > 0);
      //console.log("Discs with claims:", discsWithClaims);

      //filter out discs that are claimed, sold, or for sale
      allItems = allItems.filter(
        (disc) =>
          disc.status !== DiscStateString.Claimed &&
          disc.status !== DiscStateString.Sold &&
          disc.status !== DiscStateString.SoldOffline &&
          disc.status !== DiscStateString.ForSale &&
          disc.status !== DiscStateString.Surrendered &&
          disc.course.name !== "DRN Admins"
      );

      allItems = allItems.map((disc) => ({
        ...disc,
        dateFound: convertToLocalTime(disc.dateFound),
        dateClaimed: convertToLocalTime(disc.dateClaimed || ""),
        dateSold: convertToLocalTime(disc.dateSold || ""),
        dateTexted: convertToLocalTime(disc.dateTexted || ""),
        dateOfReminderText: convertToLocalTime(disc.dateOfReminderText || ""),
        createdAt: convertToLocalTime(disc.createdAt),
        updatedAt: convertToLocalTime(disc.updatedAt),
      }));

      allItems = allItems.sort((a, b) => {
        //sort by ID DESC
        return b.id - a.id;
      });

      setInventory(allItems);
      setCachedInventory(allItems);
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
