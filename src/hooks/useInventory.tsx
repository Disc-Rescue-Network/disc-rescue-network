import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { API_BASE_URL, Disc } from "../App";

interface InventoryContextProps {
  inventory: Disc[];
  entireInventory: Disc[];
  loading: boolean;
  errorMessage: string;
  fetchInventory: (course?: string) => Promise<void>;
  fetchEntireInventory: (course?: string) => Promise<void>;
}

const InventoryContext = createContext<InventoryContextProps | undefined>(
  undefined
);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [inventory, setInventory] = useState<Disc[]>([]);
  const [entireInventory, setEntireInventory] = useState<Disc[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchInventory = useCallback(async (course?: string) => {
    setLoading(true);
    try {
      let allItems: Disc[] = [];
      let currentPage = 1;
      let hasNextPage = true;
      const pageSize = 100;

      while (hasNextPage) {
        const params = {
          orgCode: course,
          pageSize,
          page: currentPage,
          nonVerified: true,
        };
        const response = await axios.get(`${API_BASE_URL}/inventory`, {
          params,
        });
        const { items, hasNextPage: nextPage } = response.data.data;

        allItems = [...allItems, ...items];
        currentPage++;
        hasNextPage = nextPage;
      }

      const filteredInventory = allItems.filter(
        (disc) =>
          ![
            "CLAIMED",
            "SOLD",
            "SOLD_OFFLINE",
            "FOR_SALE",
            "SURRENDERED",
          ].includes(disc.status) && disc.orgCode !== "org_a6ac1b298945b"
      );

      const sortedInventory = filteredInventory.sort((a, b) => {
        return b.id - a.id;
      });

      setInventory(sortedInventory);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setErrorMessage(
        `Error fetching inventory: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEntireInventory = useCallback(async (course?: string) => {
    setLoading(true);
    try {
      let allItems: Disc[] = [];
      let currentPage = 1;
      let hasNextPage = true;
      const pageSize = 100;

      while (hasNextPage) {
        const params = {
          orgCode: course,
          pageSize,
          page: currentPage,
        };
        const response = await axios.get(`${API_BASE_URL}/inventory`, {
          params,
        });
        const { items, hasNextPage: nextPage } = response.data.data;

        allItems = [...allItems, ...items];
        currentPage++;
        hasNextPage = nextPage;
      }

      const sortedEntireInventory = allItems.sort((a, b) => {
        return b.id - a.id;
      });
      // console.log("sortedEntireInventory", sortedEntireInventory);

      const filteredSortedEntireInventory = sortedEntireInventory.filter(
        (disc) => disc.orgCode !== "org_a6ac1b298945b"
      );

      setEntireInventory(filteredSortedEntireInventory);
    } catch (error) {
      console.error("Error fetching entire inventory:", error);
      setErrorMessage(
        `Error fetching entire inventory: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory(); // Fetch inventory on mount
    fetchEntireInventory();
    //fetchInventory("org_6108516784ae");
  }, [fetchInventory]);

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        entireInventory,
        loading,
        errorMessage,
        fetchInventory,
        fetchEntireInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = (): InventoryContextProps => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error(
      "useInventoryContext must be used within an InventoryProvider"
    );
  }
  return context;
};
