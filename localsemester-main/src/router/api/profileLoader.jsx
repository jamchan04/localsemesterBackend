import { redirect } from "react-router-dom";
import { useMyProfile } from "../../store/myprofile";
import getPhoto from "../../util/getPhoto";

export const profileLoader = async ({ params }) => {
  const MYUID = Number(sessionStorage.getItem("uid"));
  const id = Number(params.id);

  try {
    if (id === MYUID) {
      const myProfile = useMyProfile.getState().getMyProfile();

      return {
        ...myProfile,
        me: true,
      };
    } else if (id !== MYUID) {
      const reqProfile = await fetch(`/user?id=${id}`);
      const resProfile = (await reqProfile.json()) || "";

      const profilePhoto = await getPhoto(resProfile[0].photoId);

      return {
        id: resProfile[0].id,
        username: resProfile[0].username,
        profilePhoto: profilePhoto,
        message: resProfile[0].message,
        me: false,
      };
    }
  } catch (error) {
    console.error("Error loading profile data:", error);
    return redirect("/error");
  }
};
