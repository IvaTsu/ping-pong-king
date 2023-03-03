import NavigationBar from "../components/NavigationBar";
import ProtectedRoute from "./ProtectedRoute";

export default function AddGame(): JSX.Element {
  return (
    <ProtectedRoute>
      <NavigationBar />
    </ProtectedRoute>
  );
}
