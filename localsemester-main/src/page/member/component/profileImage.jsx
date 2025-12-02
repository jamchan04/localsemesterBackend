import React from "react";
import nullPhoto from "../../../assets/originalimg.png";

const ProfileImage = ({ photo }) => (
  <div className="flex-1 flex justify-center">
    <img
      src={photo || nullPhoto}
      onError={(e) => (e.currentTarget.src = nullPhoto)}
      alt="프로필"
      className="w-64 md:w-80 h-auto object-cover shadow-2xl rounded-xl transition-transform duration-700 hover:scale-105"
    />
  </div>
);

export default ProfileImage;
