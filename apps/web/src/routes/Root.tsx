
import { useAuth0 } from "@auth0/auth0-react";
import NavigationBar from "../components/NavigationBar";
import { RatingTable } from "../components/tables/RatingTable";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useEffect } from "react";
import { useUserStore } from "../store";

const USER_BOILERPLATE = {
  id: "",
  name: "",
  email: "",
  profileImage: "",
  rating: 0,
  registeredWhen: "",
  gamesPlayed: 0,
  gamesWon: 0,
  winRate: 0
}

function Root(): JSX.Element {
  const { user } = useAuth0();
  const { setUser } = useUserStore();

  useEffect(() => {
    // FIXME
    const updatedUser = {
      name: `${user?.given_name} ${user?.family_name}`,
      email: user?.email || "",
      profileImage: user?.picture || "",
      registeredWhen: user?.created_at || "",
    }

    setUser({...USER_BOILERPLATE, ...updatedUser});
  }, [user]);

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
