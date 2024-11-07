import { useState, useEffect } from "react";
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

export const useCourses = (): useCoursesHook => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>(
        `${API_BASE_URL}/course`,
        {}
      );
      console.log("Courses response: ", response.data.data);
      const fetchedCourses: Course[] = response.data.data; // Assuming the array contains all course objects
      setCourses(fetchedCourses);
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
