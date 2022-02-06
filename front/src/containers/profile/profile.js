import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ProfileComponent from "../../components/profile/profile";
import { getProfile } from "./api/crudProfiles";

const ProfileContainer = () => {
  const profileID = useParams().userid;
  const { isFetching, data } = useQuery(`profile-${profileID}`, () =>
    getProfile(profileID)
  );
  console.log(data);
  const profile = data?.data[0] || null;
  return (
    <>
      {isFetching && <div>Loading...</div>}
      {profile && <ProfileComponent user={profile} />}
    </>
  );
};

export default ProfileContainer;
