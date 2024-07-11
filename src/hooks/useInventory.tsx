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
  const dateUTC = DateTime.fromHTTP(httpTimestamp, { zone: "utc" });
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
      const response = await axios.get(`${API_BASE_URL}/inventory`, {
        params,
      });

      const convertedInventory = response.data.map((disc: Disc) => ({
        ...disc,
        dateFound: convertToEST(disc.dateFound),
        dateTexted: disc.dateTexted ? convertToEST(disc.dateTexted) : null,
        dateClaimed: disc.dateClaimed ? convertToEST(disc.dateClaimed) : null,
        claimBy: disc.claimBy ? convertToEST(disc.claimBy) : null,
      }));

      setInventory(convertedInventory);
      setLoading(false);
    } catch (error) {
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
