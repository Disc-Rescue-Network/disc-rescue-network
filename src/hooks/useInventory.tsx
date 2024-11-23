// import { useState, useMemo, useCallback, useEffect } from "react";
// import axios from "axios";
// import { API_BASE_URL, Disc, DiscStateString } from "../App";

// interface InventoryHook {
//   inventory: Disc[];
//   errorMessage: string;
//   showErrorMessage: boolean;
//   fetchInventory: (course?: string) => Promise<void>;
//   loading: boolean;
// }

// export const useInventory = (): InventoryHook => {
//   const [inventory, setInventory] = useState<Disc[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

//   const fetchInventory = async (course?: string) => {
//     console.log("Fetching inventory");
//     setLoading(true);
//     setErrorMessage("");
//     setShowErrorMessage(false);

//     try {
//       let allItems: Disc[] = [];
//       let currentPage = 1;
//       let hasNextPage = true;
//       const pageSize = 100;

//       // Fetch inventory in pages
//       while (hasNextPage) {
//         const params = {
//           course,
//           pageSize,
//           page: currentPage,
//           nonVerified: true,
//         };
//         const response = await axios.get(`${API_BASE_URL}/inventory`, {
//           params,
//         });
//         const { items, hasNextPage: nextPage } = response.data.data;

//         allItems = [...allItems, ...items];
//         currentPage++;
//         hasNextPage = nextPage;
//       }

//       // Filter, deduplicate, and sort inventory
//       const uniqueItems = Array.from(
//         new Map(allItems.map((disc) => [disc.id, disc])).values()
//       );
//       const filteredItems = uniqueItems.filter(
//         (disc) =>
//           ![
//             DiscStateString.Claimed,
//             DiscStateString.Sold,
//             DiscStateString.SoldOffline,
//             DiscStateString.ForSale,
//             DiscStateString.Surrendered,
//           ].includes(disc.status)
//       );

//       setInventory(filteredItems.sort((a, b) => b.id - a.id));
//     } catch (error) {
//       console.error("Error fetching inventory:", error);
//       setErrorMessage(
//         `Error fetching inventory: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//       setShowErrorMessage(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Automatically fetch inventory every 60 seconds
//   useEffect(() => {
//     fetchInventory(); // Initial fetch

//     const intervalId = setInterval(fetchInventory, 60000);
//     return () => clearInterval(intervalId);
//   }, [fetchInventory]);

//   // Memoize inventory for performance
//   // const memoizedInventory = useMemo(() => inventory, [inventory]);

//   return {
//     inventory,
//     errorMessage,
//     showErrorMessage,
//     fetchInventory,
//     loading,
//   };
// };

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
          course,
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

      setInventory(allItems);
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
    fetchInventory(); // Fetch inventory on mount
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
