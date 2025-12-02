import { useEffect, useRef, useState } from "react";
import yju_video from "../../../assets/yju-youtube.webm";
import yju_logo from "../../../assets/yju_logo.svg";
import logo from "../../../assets/untityLogo.png";
import { useNavigate } from "react-router-dom";

export const VideoLayerComponent = () => {
  const videoRef = useRef(null);
  const [videoHeight, setVideoHeight] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (videoRef.current) {
        setVideoHeight(videoRef.current.offsetHeight);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-between items-center mt-4 w-full ">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-[1000px] aspect-video rounded-3xl overflow-hidden filter brightness-90 "
      >
        <source src={yju_video} type="video/webm" />
        브라우저가 비디오 태그를 지원하지 않습니다.
      </video>

      <div
        className=" ml-2 w-[200px] flex-col gap-2 hidden lg:flex"
        style={{ height: `${videoHeight}px` }}
      >
        <div className="w-full h-1/2 flex flex-col justify-center items-center cursor-pointer hover:bg-[#d8d8d8] bg-brand-point dark:bg-card-dark rounded-3xl">
          <a
            href="https://computer.yju.ac.kr/index.php?mid=page_vhPi70"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-1/2 flex flex-col justify-center items-center"
          >
            <div className="w-24 h-24 my-4">
              <img
                className="object-cover"
                src={yju_logo}
                alt="영진전문대 로고"
              />
            </div>
            <h1 className="text-lg font-bold text-brand dark:text-brand-dark">
              일본IT과
            </h1>
            <p className="text-brand-sub text-xs my-2 font-normal">
              일본IT과에 대해서 알아보세요!
            </p>
          </a>
        </div>

        <div
          onClick={() => navigate("/member")}
          className="w-full h-1/2 flex flex-col justify-center items-center bg-button-point hover:bg-button-pointHover cursor-pointer rounded-3xl"
        >
          <div className="flex flex-col items-center justify-center w-full ">
            <div className="w-32 aspect-[16/6]">
              <img src={logo} alt="logo" />
            </div>
            <div className="flex items-center justify-center mb-4">
              <p className="text-2xl font-bold text-brand m-2">Team</p>
              <img
                className="object-cover w-12 h-12"
                src="https://t1.kakaocdn.net/kakaocorp/kakaocorp/service/culture/ico_card_binoculars.png"
                alt="망원경 이미지"
              />
            </div>
            <p className="text-brand-sub font-sm">프로젝트에 참가했던</p>
            <p className="text-brand-sub font-sm">동료들을 소개합니다!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
