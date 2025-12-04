import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PostViewer } from "../../components/form/postForm/postViewer";
import { Container } from "../../components/container/container";
import { useMyProfile } from "../../store/myprofile";
import { CommentBox } from "../../components/box/commentBox";
import { CommentForm } from "../../components/form/commentForm/commentForm";

export const PostDetail = () => {
  const { id } = useParams();
  const { id: myId } = useMyProfile((state) => state.myProfile);
  const [posts, setPosts] = useState(null);
  const [comments, setComments] = useState([]);
  const me = posts?.userId === myId;
  const navigator = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const req = await fetch(`/post/${id}`);
        const res = await req.json();
        setPosts(res);
      } catch (error) {
        console.error("게시글 가져오는 중 오류 발생:", error);
      }
    };
    getPost();
  }, [id]);

  useEffect(() => {
    setComments([]);
    fetch(`/postComment?postId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error("댓글 가져오는 중 오류 발생:", error);
      });
  }, [id]);

  const getcomments = (newComments) => {
    setComments((state) => [...state, newComments]);
  };
  const commentDelete = (commentId) => {
    setComments((state) => state.filter((item) => item?.id !== commentId));
  };

  if (!posts) return <p></p>;

  return (
    <>
      <Container className="relative pb-64">
        <PostViewer item={posts} me={me} url="/post" deletePosting={() => navigator(-1)} />
      </Container>
      <Container>
        <CommentForm articleId={id} url="/postComment" getComment={getcomments} />
        <CommentBox comment={comments} url="/postComment" deleteComment={commentDelete} />
      </Container>
    </>
  );
};
