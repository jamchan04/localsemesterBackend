import defaultPhoto from "../../../assets/originalimg.png";

export const ProfileArea = ({ username, message, profilePhoto }) => {
  const profileImg = profilePhoto || defaultPhoto;
  const profileMessage = message || `${username}의 프로필`;

  return (
    <>
      <div className="flex flex-col my-4 justify-center items-center h-96">
        <div className="relative flex w-full justify-center h-[330px]">
          <div className="flex justify-center items-center w-48 h-48 overflow-hidden rounded-full relative">
            <img
              className="object-cover w-48 h-48 z-[2]"
              src={profileImg}
              alt="profilePhoto"
            />
          </div>
          <div className="absolute bottom-0 z-[1] h-56 w-96 rounded-xl bg-brand-point dark:bg-card-dark flex flex-col justify-start ">
            <div className="text-center mt-[6.5rem]">
              <p className="text-3xl font-bold">{username}</p>
              <p className="my-4 text-brand-sub">{profileMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
