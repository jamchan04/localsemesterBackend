import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getPhoto from "util/getPhoto";
import { fromNow } from "../../util/fromNow";
import noimage from "../../assets/noimage.jpg";
import defaultImg from "../../assets/originalimg.png";
import { useMyProfile } from "../../store/myprofile";
import { withApiBase } from "../../util/apiClient";

export const PostCard = ({ item }) => {
  const { id, title, article, photoId, createAt, userId, username, src } = item;
  const [thumbnail, setThumbnail] = useState(noimage);
  const [profilePhoto, setProfilePhoto] = useState("");
  const navigate = useNavigate();
  const { id: myId, profilePhoto: myProfilePhoto } = useMyProfile(
    (state) => state.myProfile,
  );

  // 게시글 첫 이미지 → 썸네일 (없으면 photoId → 기본 이미지)
  useEffect(() => {
    const findFirstImage = (node) => {
      if (!node) return null;
      if (node.type === "image" && node.attrs?.src) return node.attrs.src;
      if (Array.isArray(node.content)) {
        for (const child of node.content) {
          const found = findFirstImage(child);
          if (found) return found;
        }
      }
      return null;
    };

    const loadThumbnail = async () => {
      let firstImageSrc = null;
      try {
        const json = typeof src === "string" ? JSON.parse(src) : src;
        firstImageSrc = findFirstImage(json);
      } catch (_) {
        // ignore parse error
      }
      if (firstImageSrc) {
        setThumbnail(withApiBase(firstImageSrc));
        return;
      }

      if (photoId) {
        const url = await getPhoto(photoId);
        setThumbnail(url || noimage);
        return;
      }

      setThumbnail(noimage);
    };

    loadThumbnail();
  }, [src, photoId]);

  // 작성자 프로필 이미지
  useEffect(() => {
    const fetchProfilePhoto = async () => {
      if (!userId) {
        setProfilePhoto("");
        return;
      }
      try {
        const res = await fetch(`/user?id=${userId}`);
        const users = await res.json();
        const user = users[0];
        if (user?.photoId) {
          const url = await getPhoto(user.photoId);
          setProfilePhoto(url || defaultImg);
        } else {
          setProfilePhoto(defaultImg);
        }
      } catch (err) {
        console.error("profile photo fetch error", err);
        setProfilePhoto(defaultImg);
      }
    };
    fetchProfilePhoto();
  }, [userId, myProfilePhoto, myId]);

  return (
    <div className="flex justify-center">
      <div
        onClick={() => navigate(`/post/${id}`)}
        className="block w-full cursor-pointer bg-white rounded-xl shadow px-8 py-4 hover:shadow-lg dark:bg-card-dark"
      >
        <div className="flex items-center">
          {/* 왼쪽: 작성자/제목/본문 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-2">
              <Link to={`/profile/${userId}`} className="flex items-center group">
                <img
                  src={profilePhoto || defaultImg}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover mr-3 bg-gray-200 group-hover:opacity-80 transition"
                />
                <div>
                  <div className="font-semibold group-hover:underline">{username || "익명"}</div>
                  <div className="text-xs text-gray-400">{fromNow(createAt)}</div>
                </div>
              </Link>
            </div>
            <h2 className="font-bold text-2xl mb-2">{title}</h2>
            <p className="text-base text-gray-700 mb-2 line-clamp-2">{article}</p>
          </div>
          {/* 오른쪽: 썸네일 (게시글 첫 이미지) */}
          <div className="h-[160px] w-[160px] ml-8 flex-shrink-0 flex items-center justify-center">
            <img
              src={thumbnail}
              alt="thumbnail"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
