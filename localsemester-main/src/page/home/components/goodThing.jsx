import { AnimatedContainer } from "../../../components/animationContainer/animationContainer";
import { Container } from "../../../components/container/container";

export const GoodThing = () => {
  return (
    <Container className="mt-10 mb-20">
      <AnimatedContainer>
        <div className="w-full text-center mt-40 mb-24 text-brand-sub text-2xl font-bold">
          <p className="text-3xl font-bold text-brand my-10 dark:text-brand-dark">
            이런 혜택이 있어요 !
          </p>
          <p>일본IT과는 청해진대학사업과 K-MOVE사업 지원을 받고 있습니다.</p>
          <p>일본어 취업과 관련한 다양한 혜택들을 받을 수 있어요</p>
        </div>
      </AnimatedContainer>

      <AnimatedContainer>
        <div className="grid grid-rows-4 md:grid-cols-2 gap-4">
          <Card title="현지학기제">
            일본 도시로 6주가 현지교육을 진행합니다.
          </Card>

          <Card title="일본 취업 지원">
            학교에서 일본취업박람회를 개최합니다. 일본 회사가 학교를 방문해
            면접을 진행합니다.
            <br />
            도쿄 현지 면접연수(3주)
          </Card>

          <Card title="일본어 특강">
            입학 후 졸업까지 일본어 전문 교수님들의 일본어 강의를 들을 수
            있습니다.
          </Card>

          <Card title="일본 취업 컨설팅">
            전문 컨설턴트가 일대일 개인 컨설팅을 진행해줍니다.
          </Card>
        </div>
      </AnimatedContainer>
    </Container>
  );
};

const Card = ({ children, title }) => {
  return (
    <div className="bg-brand-point p-4 rounded-xl shadow-lg dark:bg-card-dark ">
      <p className="font-bold text-xl dark:text-brand-dark text-brand mb-2">
        {title}
      </p>
      <p className="font-medium text-base text-brand-sub">{children}</p>
    </div>
  );
};
