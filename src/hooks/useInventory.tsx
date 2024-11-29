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
  loading: boolean;
  errorMessage: string;
  fetchInventory: (course?: string) => Promise<void>;
}

const InventoryContext = createContext<InventoryContextProps | undefined>(
  undefined
);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [inventory, setInventory] = useState<Disc[]>([]);
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
          ].includes(disc.status)
      );

      setInventory(filteredInventory);
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

  useEffect(() => {
    // fetchInventory(); // Fetch inventory on mount
    fetchInventory("org_6108516784ae");
  }, [fetchInventory]);

  return (
    <InventoryContext.Provider
      value={{ inventory, loading, errorMessage, fetchInventory }}
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
