export interface IPostPlayerBody {
  name: string;
  email: string;
  profileImage: string;
  tournamentRef: {
    id: string;
  };
}
