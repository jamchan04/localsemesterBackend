import { Container } from "../../components/container/container";
import { PageContainer } from "../../components/container/pageContainer";
import { VideoLayerComponent } from "./components/videoLayer";
import { LongBox } from "../../components/box/longBox";
import { Introduce } from "./components/introduce";
import { GoodThing } from "./components/goodThing";
import { EndPoint } from "./components/endPoint";

export const Home = () => {
  return (
    <>
      <PageContainer>
        <Container className="bg-brand">
          <VideoLayerComponent />
          <div className="md:grid md:grid-cols-2 flex gap-2 mt-2">
            <LongBox
              title="현지학기제"
              article="일본에서 보내는 방학생활을 알아봐요"
              to="/localSemester"
            >
              <img
                className="w-12 h-12 md:w-[4.5rem] md:h-[4.5rem]"
                src="https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/category/1ee6415a019300001.png?type=thumb&opt=C72x72.fwebp"
                alt="나팔"
              />
            </LongBox>
            <LongBox
              title="게시판"
              article="친구들과 자유롭게 소통해요!"
              to="/post"
            >
              <img
                className="w-12 h-12 md:w-[4.5rem] md:h-[4.5rem]"
                src="https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/6565ef4d017800001.png?type=thumb&opt=C72x72.fwebp"
                alt="백열등"
              />
            </LongBox>
          </div>
        </Container>
      </PageContainer>
      <Introduce />
      <GoodThing />
      <EndPoint />
    </>
  );
};
