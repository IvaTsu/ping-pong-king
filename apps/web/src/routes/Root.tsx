import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

import NavigationBar from "../components/NavigationBar";
import { RatingTable } from "../components/tables/RatingTable";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useUserStore } from "../store";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../api/game/post/mutations";

const USER_BOILERPLATE = {
  id: "",
  name: "",
  email: "",
  profileImage: "",
  rating: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  winRate: 0,
};

function Root(): JSX.Element {
  const { user } = useAuth0();
  const { setUser } = useUserStore();

  const { mutate: createUserMutation } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      const updatedUser = {
        name: `${user!.givenName} ${user!.familyName}`,
        email: data.email,
        profileImage: user!.picture,
      };

      setUser({ ...USER_BOILERPLATE, ...updatedUser });
    },
  });

  useEffect(() => {
    if (user == null) return;

    const {
      given_name: givenName,
      family_name: familyName,
      email,
      picture,
    } = user;

    if (
      givenName == null ||
      familyName == null ||
      picture == null ||
      email == null
    )
      return;

    const userDTO = {
      email,
      sub: user.sub!,
    };

    createUserMutation({
      body: {
        email: userDTO.email,
        sub: userDTO.sub,
      },
    });
  }, [user, createUserMutation]);

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
