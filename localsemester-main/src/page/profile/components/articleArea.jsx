import { useEffect, useState } from "react";
import { PostingBox } from "./box/postingBox";
import { getPostingList } from "../api/getPostingList";

export const ArticleArea = ({ id, me }) => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostingList(id);
        setPostList(response ?? []);
      } catch (error) {
        console.error("error:", error);
        setPostList([]);
      }
    };
    fetchPost();
  }, [id]);

  const deletePosting = (id) => {
    const newPostList = postList.filter((v) => v.id !== id);
    setPostList(newPostList);
  };

  const hasPosts = postList.length > 0;

  return (
    <div className="px-2">
      <p className="text-center border-t-2 pt-2 pb-1 border-[#ededed] dark:border-[#191b22] font-bold m-1 mb-2 text-base dark:text-brand-dark text-brand-sub">
        게시글
      </p>
      <div
        className={
          hasPosts
            ? "grid grid-cols-3 gap-1"
            : "flex justify-center items-center h-[40vh]"
        }
      >
        {hasPosts ? (
          postList.map((item) => (
            <PostingBox
              key={item.id}
              item={item}
              me={me}
              deletePosting={deletePosting}
            />
          ))
        ) : (
          <p className="font-bold ">게시글 없음</p>
        )}
      </div>
    </div>
  );
};
