import { Button } from "../../button/button";
import useChange from "../../../hooks/useChange";
import { useMyProfile } from "../../../store/myprofile";
import { createAt } from "../../../util/createAt";
import { checkAuth } from "auth/auth";

// articleId = 게시글 id
// url 댓글을 저장해야하는 테이블
// getComment 댓글 작성 완료 후 바로 볼 수 있도록 댓글 내용 가져오기

export const CommentForm = ({ articleId, url, getComment }) => {
  const { inputValue, setInputValue, onChange } = useChange({
    comment: "",
  });
  const { id, username } = useMyProfile((state) => state.myProfile);

  const createComment = async () => {
    const key = url === "/postComment" ? "postId" : "semesterId";

    try {
      if (inputValue.comment.trim() === "") {
        alert("댓글을 입력해주세요.");
        return;
      }

      const session = await checkAuth();
      if (!session) {
        alert("로그인이 필요합니다.");
        return;
      } else {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: id,
            username: username,
            [key]: articleId,
            article: inputValue.comment,
            createAt: createAt(),
          }),
        });
        const data = await response.json();
        getComment(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setInputValue({ comment: "" });
    }
  };

  return (
    <div className="flex flex-col gap-4 border-t py-8 my-10 border-[#ededed] dark:border-[#27303d]">
      <p className="text-lg font-bold">댓글</p>
      <textarea
        value={inputValue.comment}
        onChange={(e) => onChange(e, "comment")}
        className="px-4 py-2 rounded-md resize-none w-full border border-[#ededed] dark:border-[#27303d] focus:outline-none dark:bg-card-hover "
        placeholder="댓글 달기..."
      />
      <Button onClick={createComment} className="w-full sm:w-32 self-end">
        댓글 작성
      </Button>
    </div>
  );
};
