import getPhoto from "util/getPhoto";
import { fromNow } from "../../../util/fromNow";
import { useEffect, useState } from "react";
import noimage from "../../../assets/noimage.jpg";

export const PostBox = ({
  title,
  article,
  onClick,
  id,
  createAt,
  photoId,
  username,
}) => {
  const [photo, setPhoto] = useState();
  useEffect(() => {
    const getSemesterPhoto = async () => {
      const res = await getPhoto(photoId);
      setPhoto(res);
    };
    getSemesterPhoto();
  }, []);

  return (
    <>
      <div
        onClick={() => onClick(id)}
        className="w-[372px] h- bg-white rounded-2xl shadow-lg hover:shadow-xl-hover transition-shadow duration-300 cursor-pointer flex flex-col dark:bg-card-dark "
      >
        <div className="h-[300px] w-full ">
          <span className="text-brand-sub ">
            <img
              src={photo ? photo : noimage}
              alt=""
              className="w-full h-full object-cover rounded-t-2xl"
            />
          </span>
        </div>
        <div className="p-6">
          <h3 className="text-3xl font-bold text-brand mb-4 leading-snug truncate dark:text-brand-dark">
            {title}
          </h3>
          <p className="text-brand dark:text-brand-dark text-base overflow-auto h-[48px] mb-4 line-clamp-2">
            {article}
          </p>
          <div className="flex justify-between items-end">
            <p className="text-sm text-brand-sub ">{username}</p>
            <p className="text-sm text-brand-sub  ">{fromNow(createAt)}</p>
          </div>
        </div>
      </div>
    </>
  );
};
