import { useState } from "react";
import axios from "axios";
import { API_BASE_URL, Course } from "../App";

interface useCoursesHook {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  loading: boolean;
  fetchCourses: () => void;
}

interface ApiResponse {
  data: Course[];
}

const CACHE_KEY = "coursesCache";
const CACHE_TIMESTAMP_KEY = "coursesCacheTimestamp";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

const getCachedCourses = () => {
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

const setCachedCourses = (data: Course[]) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
};

export const useCourses = (): useCoursesHook => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    const cachedCourses = getCachedCourses();
    if (cachedCourses) {
      setCourses(cachedCourses);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>(
        `${API_BASE_URL}/course`,
        {}
      );
      console.log("Courses response: ", response.data.data);
      const fetchedCourses: Course[] = response.data.data; // Assuming the array contains all course objects
      setCourses(fetchedCourses);
      setCachedCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    courses,
    setCourses,
    loading,
    fetchCourses,
  };
};
