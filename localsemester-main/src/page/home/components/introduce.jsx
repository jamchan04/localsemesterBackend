import { AnimatedContainer } from "../../../components/animationContainer/animationContainer";

import 수업사진 from "../../../assets/classimg.jpg";
import 컴퓨터공부사진 from "../../../assets/studyimg.jpg";
import 캡스톤사진 from "../../../assets/capstoneimg.jpg";
import 면접준비 from "../../../assets/workimg.jpg";

// 씨발 무조건 리팩토링 해라
export const Introduce = () => {
  return (
    <div className="w-full">
      <div className="py-40">
        <AnimatedContainer>
          <p className="text-3xl mb-6 text-center font-bold  mt-20">
            우리는 이런걸 해요.
          </p>
        </AnimatedContainer>
        <AnimatedContainer>
          <div className="flex flex-col justify-center items-center mb-20 font-medium text-brand-sub text-lg md:text-2xl">
            <p className="">일본 IT반은 일본 취업을 위해 공부합니다.</p>
            <p className="">
              시작한 이유는 모두 다르지만 같은 목표를 위해 서로 돕고 성장해요.
            </p>
          </div>
        </AnimatedContainer>
      </div>

      {/* layer1 */}

      <div className="flex w-full justify-center h-screen items-center px-2">
        <div className="h-screen flex flex-col items-start mt-48 mr-4 md:mr-28">
          <AnimatedContainer>
            <p className="my-10 text-[#38b4ff] font-bold text-2xl">일본어</p>
          </AnimatedContainer>

          <AnimatedContainer delay={0.2}>
            <div className="text-brand-sub font-medium text-lg md:text-3xl">
              <p className=" font-bold mb-4   text-brand dark:text-brand-dark">
                일본어 특강 운영
              </p>
              <p className="md:text-xl">
                일본회사에 취업하기 위해서 일본어학습은 필수입니다.
                <br />
                일본어 특별강의를 운영해 매일매일 일본어를 학습합니다.
              </p>
            </div>
          </AnimatedContainer>
        </div>

        <div className="flex w-[600px] h-screen  items-end mb-48">
          <AnimatedContainer delay={0.4}>
            <div className="rounded-lg overflow-hidden shadow-3xl dark:shadow-dark">
              <img className="w-full" src={수업사진} alt="수업사진" />
            </div>
          </AnimatedContainer>
        </div>
      </div>

      {/* layer2 */}
      <div className="flex px-2 w-full justify-center h-screen items-center bg-brand-point dark:bg-card-dark">
        <div className="flex w-[700px] h-screen  items-end mb-48">
          <AnimatedContainer delay={0.4}>
            <div className="rounded-lg overflow-hidden shadow-3xl dark:shadow-dark">
              <img
                className="w-full"
                src={컴퓨터공부사진}
                alt="컴퓨터공부사진"
              />
            </div>
          </AnimatedContainer>
        </div>
        <div className="h-screen flex flex-col items-start mt-56 ml-4 md:ml-28">
          <AnimatedContainer>
            <p className="my-10 text-[#38b4ff] font-bold text-xl md:text-2xl ">
              프로그래밍 · 네트워크
            </p>
          </AnimatedContainer>

          <AnimatedContainer delay={0.2}>
            <div className="text-brand-sub text-xl font-medium">
              <p className="text-lg md:text-3xl font-bold mb-4 text-brand dark:text-brand-dark">
                전공에 맞는 강의
              </p>
              <p className="text-lg md:text-xl">
                전공을 세분화합니다
                <br />
                네트워크반과 프로그래밍반을 운영합니다.
                <br />
                전문적인 IT인으로 성장합니다.
              </p>
            </div>
          </AnimatedContainer>
        </div>
      </div>

      {/* layer3 */}
      <div className="flex px-2 w-full justify-center h-screen items-center ">
        <div className="h-screen flex flex-col items-start mt-48 mr-4 md:mr-28">
          <AnimatedContainer>
            <p className="my-10 text-[#38b4ff] font-bold text-2xl">프로젝트</p>
          </AnimatedContainer>

          <AnimatedContainer delay={0.2}>
            <div className="text-brand-sub text-xl font-medium">
              <p className="text-3xl font-bold mb-4 text-brand dark:text-brand-dark">
                캡스톤 · 포토폴리오 제작
              </p>
              <p>
                자신만의 앱을 만들어요.
                <br /> 학습한 내용을 바탕으로
                <br />
                동료들과 프로젝트를 진행합니다.
              </p>
            </div>
          </AnimatedContainer>
        </div>

        <div className="flex w-[760px] h-screen  items-end mb-48">
          <AnimatedContainer delay={0.4}>
            <div className="rounded-lg overflow-hidden shadow-3xl dark:shadow-dark">
              <img className="w-full" src={캡스톤사진} alt="캡스톤사진" />
            </div>
          </AnimatedContainer>
        </div>
      </div>

      {/* layer4 */}
      <div className="flex px-2 w-full justify-center h-screen items-center bg-brand-point dark:bg-card-dark">
        <div className="flex w-[700px] h-screen  items-end mb-48">
          <AnimatedContainer delay={0.4}>
            <div className="rounded-lg overflow-hidden shadow-3xl dark:shadow-dark">
              <img className="w-full" src={면접준비} alt="면접준비" />
            </div>
          </AnimatedContainer>
        </div>
        <div className="h-screen flex flex-col items-start mt-56 ml-28">
          <AnimatedContainer>
            <p className="my-10 text-[#38b4ff] font-bold text-2xl">면접준비</p>
          </AnimatedContainer>

          <AnimatedContainer delay={0.2}>
            <div className="text-brand-sub text-xl font-medium">
              <p className="text-3xl font-bold mb-4 text-brand dark:text-brand-dark">
                모의면접 진행
              </p>
              <p>
                일본취업을 위한 면접을 준비합니다
                <br />
                이력서를 점검하고
                <br />
                모의면접을 진행합니다.
              </p>
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};
