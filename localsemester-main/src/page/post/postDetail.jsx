import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PostViewer } from "../../components/form/postForm/postViewer";
import { Container } from "../../components/container/container";
import { useMyProfile } from "../../store/myprofile";
import { CommentBox } from "../..//components/box/commentBox";
import { CommentForm } from "../../components/form/commentForm/commentForm";

export const PostDetail = () => {
  const { id } = useParams();
  const { id: myId } = useMyProfile((state) => state.myProfile);
  const [posts, setPosts] = useState(null);
  const [comments, setComments] = useState([]);
  const me = posts?.userId === myId;
  // 게시글 작성자와 현재 로그인한 사용자가 같은지 확인
  const navigator = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const req = await fetch(`/post/${id}`);
        const res = await req.json();
        setPosts(res);
      } catch (error) {
        console.error("게시글 가져오기 중 오류 발생:", error);
      }
    };

    // 게시글 정보 가져오기
    getPost();
  }, [id]);

  useEffect(() => {
    // 댓글 정보 가져오기
    fetch(`/postComment?postId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error("댓글 가져오기 중 오류 발생:", error);
      });
  }, []);

  const getcomments = (newComments) => {
    setComments((state) => [...state, newComments]);
  };
  const commentDelete = (id) => {
    setComments((state) => state.filter((item) => item?.id !== id));
  };

  if (!posts) return <p></p>;

  return (
    <>
      <Container className="relative pb-64">
        <PostViewer
          item={posts}
          me={me}
          url="/post"
          deletePosting={() => navigator(-1)}
        />
      </Container>
      <Container>
        <CommentForm
          articleId={id}
          url={"/postComment"}
          getComment={getcomments}
        />
        <CommentBox
          comment={comments}
          url={"/postComment"}
          deleteComment={commentDelete}
        />
      </Container>
    </>
  );
};
