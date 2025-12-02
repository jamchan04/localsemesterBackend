import { Swiper, SwiperSlide } from "swiper/react";
import { PostBox } from "./postBox";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import "../../../index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { useMyProfile } from "../../../store/myprofile";
import { Container } from "components/container/container";

export const PostList = ({ semesters, onClick }) => {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate("/localSemesterCreate");
  };
  const { state } = useMyProfile((state) => state.myProfile);

  const isAdmin = state === 777;
  return (
    <div className="w-screen overflow-x-auto pl-4 pr-4">
      <Container>
        <div className="flex items-end mb-3 ml-1">
          <p className="text-4xl font-kakao">공지사항</p>
          {isAdmin && (
            <button
              className="text-[#38b4ff] dark:text-[#38b4ff] text-sm ml-4"
              onClick={onClickBtn}
            >
              글쓰기 &gt;
            </button>
          )}
        </div>
      </Container>
      <Swiper
        style={{
          paddingRight: "1rem",
          overflow: "visible",
        }}
        modules={[Navigation, Pagination, Mousewheel]}
        mousewheel={{ forceToAxis: true }}
        spaceBetween={30}
        slidesPerView="auto"
        navigation
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          type: "bullets",
        }}
      >
        {semesters.map((semester) => (
          <SwiperSlide key={semester.id} className="!w-[350px] py-10">
            <PostBox
              title={semester?.title}
              article={semester?.article}
              id={semester?.id}
              onClick={onClick}
              createAt={semester.createAt}
              photoId={semester.photoId}
              username={semester.username}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination mt-6 flex justify-center"></div>
    </div>
  );
};
