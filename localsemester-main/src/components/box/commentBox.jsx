import { checkAuth } from "../../auth/auth";
import { useMyProfile } from "../../store/myprofile";
import { fromNow } from "../../util/fromNow";
import { ProfilePhotoContainer } from "../container/profilePhotoContainer";

// 최신순으로 정렬된 댓글을 보여주여야하므로 처음 comment 배열을 넣을때 순서를 뒤집어서 넣어야함
// 댓글 배열만 받는 컴포넌트
// comment = 댓글 리스트 배열
// url = 댓글 삭제시 테이블 이름
// deleteComment = 삭제 후 원하는 동작

export const CommentBox = ({ comment, url, deleteComment }) => {
  const { id } = useMyProfile((state) => state.myProfile);

  const deleteButton = async (id) => {
    if (typeof id !== "number") {
      return;
    }
    const session = checkAuth();
    if (session) {
      try {
        await fetch(`${url}/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        if (typeof deleteComment === "function") {
          deleteComment(id);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("회원정보가 일치하지 않습니다.");
    }
  };

  return (
    <div>
      {comment.map((item) => (
        <div
          key={item.id}
          className="h-auto flex flex-col py-6 border-b border-[#ededed] dark:border-brand-sub"
        >
          <div className="flex items-center">
            <ProfilePhotoContainer width={16} id={item?.userId} alt="" />
            <div className="mx-4">
              <p className="font-bold text-lg">{item?.username}</p>
              <p className="text-xs text-brand-sub">
                {fromNow(item?.createAt)}
              </p>
            </div>
            {item?.userId === id ? (
              <div
                className="bg-brand-point dark:bg-card-dark hover:opacity-60 text-sm text-brand-sub rounded-md cursor-pointer ml-2 px-2"
                onClick={() => deleteButton(item?.id)}
              >
                X
              </div>
            ) : null}
          </div>
          <div className="mt-4">
            <p>{item?.article}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
