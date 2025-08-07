import NavigationBar from "../components/NavigationBar";
import { RatingTable } from "../components/tables/RatingTable";
import ProtectedRoute from "../routes/ProtectedRoute";

function Root(): JSX.Element {
  return (
    <ProtectedRoute>
      <>
        <NavigationBar />
        <RatingTable />
      </>
    </ProtectedRoute>
  );
}

export default Root;
