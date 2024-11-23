import "../globals.css";
import FullLogoHeader from "../components/HeaderComponents";
import HomePageButtons from "../components/HomePageButtons";
import Subheader from "../components/Subheader";
import Discs from "../components/Discs";
import { useInventoryContext } from "../hooks/useInventory";
import LoadingScreen from "./LoadingSceen";
import { useCoursesContext } from "../hooks/useCourses";

function Home() {
  const { inventory, loading } = useInventoryContext();
  const { courses, loading: loadingCourses } = useCoursesContext();

  if (loading || loadingCourses) {
    return <LoadingScreen />;
  }

  return (
    <div className="inner-app-container">
      <FullLogoHeader />
      <HomePageButtons />
      <div className="disc-container">
        <Subheader text="RECENTLY TURNED IN DISCS" />
        <Discs arrayOfDiscs={inventory} isLoading={loading} />
      </div>
    </div>
  );
}

export default Home;
