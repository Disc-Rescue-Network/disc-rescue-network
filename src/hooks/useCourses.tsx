import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { API_BASE_URL, Course } from "../App";

interface CoursesContextProps {
  courses: Course[];
  loading: boolean;
  errorMessage: string;
  fetchCourses: () => Promise<void>;
}

const CoursesContext = createContext<CoursesContextProps | undefined>(
  undefined
);

export const CoursesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<{ data: Course[] }>(
        `${API_BASE_URL}/course`
      );
      const fetchedCourses: Course[] = response.data.data;
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setErrorMessage(
        `Error fetching courses: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <CoursesContext.Provider
      value={{ courses, loading, errorMessage, fetchCourses }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export const useCoursesContext = (): CoursesContextProps => {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error("useCoursesContext must be used within a CoursesProvider");
  }
  return context;
};
