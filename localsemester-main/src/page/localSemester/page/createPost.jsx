import { Container } from "components/container/container";
import MyEditor from "../../../components/form/postForm/postForm";

export const LocalSemesterCreatePost = () => {
  return (
    <>
      <Container>
        <MyEditor url="/semester" exitPath="/localSemester" post={true} />
      </Container>
    </>
  );
};
