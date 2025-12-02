import { useNavigate } from "react-router-dom";
import logo from "../../assets/untityLogo.png";
import { Button } from "../../components/button/button";
import { PageContainer } from "../../components/container/pageContainer";

export const ErrorPage = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1, { replace: true });
    return;
  };
  const goHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <PageContainer>
      <div className="w-screen h-screen flex justify-center items-center flex-col">
        <div className="w-64 aspect-[16/4]">
          <img className="object-cover" src={logo} alt="logo" />
        </div>
        <h1 className="text-6xl font-bold my-4 ">404 ERROR</h1>
        <p className="text-brand-sub">페이지를 찾을 수 없습니다.</p>
        <p className="text-brand-sub">정상적인 페이지로 이동해주세요!</p>

        <div className="flex gap-4 mt-16">
          <Button
            onClick={back}
            className="w-32 bg-button-point hover:bg-button-pointHover"
          >
            이전페이지
          </Button>
          <Button onClick={goHome} className="w-32">
            메인페이지
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};
