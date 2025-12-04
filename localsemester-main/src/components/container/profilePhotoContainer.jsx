import { useNavigate } from "react-router-dom";
import defaultPhoto from "../../assets/originalimg.png";
import getPhoto from "../../util/getPhoto";
import { useEffect, useState } from "react";
import { useMyProfile } from "../../store/myprofile";

export const ProfilePhotoContainer = ({ id, width, alt }) => {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState("");
  const { id: myId, profilePhoto: myProfilePhoto } = useMyProfile(
    (state) => state.myProfile,
  );

  const onClick = () => {
    navigate("/profile/" + id);
  };

  useEffect(() => {
    const photo = async () => {
      const getPhotoId = await fetch(`/user?id=${id}`);
      const response = await getPhotoId.json();

      const profileImg = await getPhoto(response[0]?.photoId);
      setProfilePhoto(profileImg || "");
    };
    photo();
  }, [id, myId, myProfilePhoto]);

  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer aspect-square justify-center items-center rounded-full overflow-hidden w-${width} h-${width}`}
    >
      <img
        className="w-full h-full object-cover"
        src={profilePhoto ? profilePhoto : defaultPhoto}
        alt={alt}
      />
    </div>
  );
};
