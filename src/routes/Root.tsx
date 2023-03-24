import NavigationBar from "../components/NavigationBar";
import { Table } from "../components/Table";
import ProtectedRoute from "../routes/ProtectedRoute";

function Root(): JSX.Element {
  return (
    <ProtectedRoute>
      <>
        <NavigationBar />
        <Table />
      </>
    </ProtectedRoute>
  );
}

export default Root;
