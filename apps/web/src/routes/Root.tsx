import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

import NavigationBar from "../components/NavigationBar";
import { RatingTable } from "../components/tables/RatingTable";
import ProtectedRoute from "../routes/ProtectedRoute";
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
  winRate: 0,
};

function Root(): JSX.Element {
  const { user } = useAuth0();
  const { setUser } = useUserStore();

  useEffect(() => {
    if (user == null) return;

    const {
      given_name: givenName,
      family_name: familyName,
      email,
      picture,
      created_at: createdAt,
    } = user;

    if (
      givenName == null ||
      familyName == null ||
      createdAt == null ||
      picture == null ||
      email == null
    )
      return;

    const updatedUser = {
      name: `${givenName} ${familyName}`,
      email,
      profileImage: picture,
      registeredWhen: createdAt,
    };

    setUser({ ...USER_BOILERPLATE, ...updatedUser });
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
