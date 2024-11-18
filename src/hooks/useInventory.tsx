import { useState, useMemo, useCallback } from "react";
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
  const dateUTC = DateTime.fromHTTP(httpTimestamp, { zone: "utc" });
  return dateUTC.toFormat("yyyy-MM-dd");
};

const convertToLocalTime = (httpTimestamp: string) => {
  const dateUTC = DateTime.fromHTTP(httpTimestamp, { zone: "utc" });
  return dateUTC.setZone(DateTime.local().zoneName).toFormat("yyyy-MM-dd");
};

export const useInventory = (): InventoryHook => {
  const [inventory, setInventory] = useState<Disc[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const fetchInventory = useCallback(async (course?: string) => {
    try {
      const params = course ? { course } : {};
      let allItems: Disc[] = [];
      let currentPage = 1;
      let hasNextPage = true;
      let pageSize = 10000;

      const testResponse = await axios.get(
        `${API_BASE_URL}/inventory?pageSize=1&page=1`,
        { params }
      );

      const totalItems = testResponse.data.data.totalItems;

      const response = await axios.get(
        `${API_BASE_URL}/inventory?pageSize=${totalItems}?nonVerified=true`,
        { params }
      );

      const discResponse = response.data.data.items;
      allItems = discResponse;

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

  const memoizedInventory = useMemo(() => inventory, [inventory]);

  return {
    inventory: memoizedInventory,
    errorMessage,
    showErrorMessage,
    fetchInventory,
    loading,
  };
};
