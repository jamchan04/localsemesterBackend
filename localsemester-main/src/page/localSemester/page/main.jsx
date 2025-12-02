import { Container } from "../../../components/container/container";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import semesterVideo from "../../../assets/semesterVideo.webm";
import { AnimatedContainer } from "../../../components/animationContainer/animationContainer";
import osaka from "../../../assets/osaka.jpg";
import lecture from "../../../assets/lecture.jpg";
import life from "../../../assets/life.jpg";
import it from "../../../assets/it.jpg";
import { PostList } from "../components/postList";
import itcomp from "../../../assets/itcomp.jpg";

export const LocalSemesterMain = () => {
  const [semesters, setSemesters] = useState([]);
  const navigate = useNavigate();

  const onClickSemesters = (id) => {
    navigate("/localSemesterPost/" + id);
  };

  useEffect(() => {
    fetch("/semester")
      .then((res) => res.json())
      .then((data) => {
        setSemesters(data.reverse());
      });
  }, []);
  // 1410 831
  return (
    <>
      <div className="h-screen">
        <video muted autoPlay loop className="w-full h-full object-cover ">
          <source src={semesterVideo} type="video/mp4 " />
        </video>
      </div>

      <Container>
        <div>
          <div className="flex flex-row items-start justify-start mt-52">
            <AnimatedContainer delay={0.25}>
              <img className=" w-[691px] " alt="" src={osaka} />
            </AnimatedContainer>
            <AnimatedContainer delay={0.25}>
              <div className="flex flex-col">
                <p className="ml-10 mt-48 md:text-3xl lg:text-4xl text-2xl font-kakao dark:text-brand-dark">
                  4주간의 오사카 어학연수
                </p>
                <p className="ml-10 mt-10 font-kakaoSmall text-gray-400 text-lg">
                  영진전문대학교는 일본IT과 재학생들의 글로벌 역량 강화를 <br />
                  위해, 청해진 사업을 통해 항공·숙박·수업비 전액을 지원하는{" "}
                  <br />
                  4주간의 일본 오사카 어학연수 프로그램을 운영하고 있습니다
                </p>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-row">
          <AnimatedContainer delay={0.5}>
            <p className=" text-4xl mt-[500px]">일본의 생활과 문화 체험</p>
            <p className="mr-10 mt-10 font-kakaoSmall text-gray-400 text-lg">
              일본의 다양한 생활 방식과 문화를 직접 체험하며 현지인과 <br />
              자연스럽게 교류할 수 있는 기회를 제공합니다 <br />
              이러한 경험은 일본 사회에 대한 이해를 높이고,
              <br /> 향후 일본 기업에 취업할 때 실질적인 적응력과 <br />
              경쟁력을 갖추는 데 큰 도움이 됩니다
            </p>
          </AnimatedContainer>
          <AnimatedContainer delay={0.5}>
            <img className=" w-[700px] mt-72" alt="" src={life} />
          </AnimatedContainer>
        </div>
      </Container>
      <Container>
        <div className="mt-52">
          <AnimatedContainer delay={0.25}>
            <div className="flex items-start">
              <div>
                <div className="h-[550px] w-auto">
                  <img className="h-full " alt="" src={itcomp} />
                </div>
                <AnimatedContainer>
                  <div className="ml-10">
                    <p className=" md:text-3xl lg:text-4xl text-2xl font-kakao mt-10">
                      현지 IT기업 견학
                    </p>
                    <p className=" mt-10 font-kakaoSmall text-gray-400 text-lg">
                      현지 IT기업의 업무 현장을 직접 보고 배우며, 일본의 개발
                      문화와 <br />
                      채용 흐름을 이해하는 실질적인 커리어 학습의 기회를
                      가집니다
                    </p>
                  </div>
                </AnimatedContainer>
              </div>
              <div className="ml-20 mt-16">
                <AnimatedContainer delay={0.5}>
                  <div className="h-[350px] w-auto">
                    <img className="h-full" alt="" src={it} />
                  </div>
                  <p className=" mt-10 font-kakaoSmall text-gray-400 text-lg">
                    다양한 직무 담당자와의 교류를 통해, 일본 IT업계의 <br />
                    커리어 패스와 성장 전략에 대한 인사이트를 얻을 수 있습니다
                  </p>
                </AnimatedContainer>
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </Container>
      <Container className="mt-52">
        <div>
          <div className="flex flex-row items-start justify-start ">
            <AnimatedContainer delay={0.25}>
              <img className=" w-[600px] " alt="" src={lecture} />
            </AnimatedContainer>
            <AnimatedContainer delay={0.25}>
              <div className="flex flex-col">
                <div className="ml-20 pb-32">
                  <p className="mt-72 md:text-3xl lg:text-4xl text-2xl font-kakao dark:text-brand-dark">
                    일본인 교수의 일본어 강의
                  </p>
                  <p className=" mt-10 font-kakaoSmall text-gray-400 text-lg">
                    현지 일본인 교수의 체계적인 수업과 다양한 국가에서 온<br />
                    학생들과의 활발한 교류를 통해,
                    <br /> 실질적인 일본어 능력과 글로벌 마인드를 <br /> 동시에
                    향상시킬 수 있는 기회를 제공합니다
                  </p>
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </Container>
      <div className="mt-40 flex justify-center">
        <PostList semesters={semesters} onClick={onClickSemesters} />
      </div>
    </>
  );
};
