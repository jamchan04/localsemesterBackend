import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getPhoto from "util/getPhoto";
import { fromNow } from "../../util/fromNow";
import noimage from "../../assets/noimage.jpg";

export const PostCard = ({ item }) => {
  const { id, title, article, photoId, createAt, userId, username } = item;
  const [thumbnail, setThumbnail] = useState(noimage);
  const [profilePhoto, setProfilePhoto] = useState("");
  const navigate = useNavigate();
  // 게시글 썸네일
  useEffect(() => {
    const fetchThumbnail = async () => {
      if (photoId) {
        const url = await getPhoto(photoId);
        setThumbnail(url);
      } else {
        setThumbnail(noimage);
      }
    };
    fetchThumbnail();
  }, [photoId]);

  // 작성자 프로필 이미지
  useEffect(() => {
    const fetchProfilePhoto = async () => {
      if (!userId) return;
      // user 정보 fetch
      const res = await fetch(`/user?id=${userId}`);
      const users = await res.json();
      const user = users[0];
      if (user?.photoId) {
        const url = await getPhoto(user.photoId);
        setProfilePhoto(url);
      } else {
        setProfilePhoto(""); // 기본 이미지 처리 가능
      }
    };
    fetchProfilePhoto();
  }, [userId]);

  return (
    <div className="flex justify-center">
      <div
        onClick={() => navigate(`/post/${id}`)}
        className="block w-full cursor-pointer bg-white rounded-xl shadow px-8 py-4 hover:shadow-lg dark:bg-card-dark"
      >
        <div className="flex items-center">
          {/* 왼쪽: 프로필/작성자/날짜/글 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-2">
              <Link
                to={`/profile/${userId}`}
                className="flex items-center group"
              >
                <img
                  src={profilePhoto || "/default-profile.png"}
                  alt="프로필"
                  className="w-10 h-10 rounded-full object-cover mr-3 bg-gray-200 group-hover:opacity-80 transition"
                />
                <div>
                  <div className="font-semibold group-hover:underline">
                    {username || "익명"}
                  </div>
                  <div className="text-xs text-gray-400">
                    {fromNow(createAt)}
                  </div>
                </div>
              </Link>
            </div>
            <h2 className="font-bold text-2xl mb-2">{title}</h2>
            <p className="text-base text-gray-700 mb-2 line-clamp-2">
              {article}
            </p>
          </div>
          {/* 오른쪽: 썸네일 */}
          <div className="h-[160px] w-[160px] ml-8 flex-shrink-0 flex items-center justify-center">
            <img
              src={thumbnail}
              alt="썸네일"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
