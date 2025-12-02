import { useLoaderData } from "react-router-dom";
import { Container } from "../../components/container/container";
import { MyProfileArea } from "./components/myProfileArea";
import { ProfileArea } from "./components/profileArea";
import { ArticleArea } from "./components/articleArea";

export const Profile = () => {
  const { username, message, id, me, profilePhoto } = useLoaderData();

  return (
    <Container>
      {me ? (
        <MyProfileArea />
      ) : (
        <ProfileArea
          username={username}
          message={message}
          profilePhoto={profilePhoto}
        />
      )}
      <ArticleArea id={id} me={me} />
    </Container>
  );
};
