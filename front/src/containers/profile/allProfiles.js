import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { getAllProfiles } from "./api/crudProfiles";
import ProfilesComponent from "../../components/profile/profileCards";

const ProfilesContainer = () => {
  const { isFetching, data } = useQuery("profiles", () => getAllProfiles());

  const profiles = data?.data || [];

  const profileList = profiles?.map((profile) => (
    <Link to={`/profiles/${profile.user_id}`} key={profile.user_id}>
      <ProfilesComponent profile={profile} />
    </Link>
  ));

  return (
    <>
      {isFetching && <div>Loading...</div>}
      {profiles && <Container>{profileList}</Container>}
    </>
  );
};

export default ProfilesContainer;
