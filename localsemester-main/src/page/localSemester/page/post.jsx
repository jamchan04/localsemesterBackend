import { useEffect, useState } from "react";
import { PostViewer } from "../../../components/form/postForm/postViewer";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../../components/container/container";
import { useMyProfile } from "../../../store/myprofile";
import { CommentForm } from "../../../components/form/commentForm/commentForm";
import { CommentBox } from "components/box/commentBox";

export const LocalSemesterPost = () => {
  const [article, setArticle] = useState();
  const { id: userid } = useMyProfile((state) => state.myProfile);
  const { id } = useParams();
  const nav = useNavigate();
  const [comments, setComments] = useState([]);

  const me = article?.userId === userid;

  const deleteComment = (id) => {
    fetchComments();
  };

  useEffect(() => {
    const getArticle = async () => {
      try {
        const req = await fetch("/semester/" + id);
        const res = await req.json();
        setArticle(res);
      } catch (error) {
        console.log(error);
      }
    };
    getArticle();
  }, [id]);

  useEffect(() => {
    fetch("/semesterComment")
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }, []);

  const fetchComments = () => {
    fetch(`/semesterComment?semesterId=${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const getcomments = (newComments) => {
    setComments((state) => [...state, newComments]);
  };

  return (
    <>
      <Container className="relative pb-64">
        {article && (
          <PostViewer
            item={article}
            me={me}
            url="/localsemester"
            deletePosting={() => nav(-1)}
          />
        )}
      </Container>
      <Container>
        <CommentForm
          articleId={Number(id)}
          url={"/semesterComment"}
          getComment={getcomments}
        />
        <CommentBox
          comment={comments}
          url={"/semesterComment"}
          deleteComment={deleteComment}
        />
      </Container>
    </>
  );
};
