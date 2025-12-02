import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import 수업 from "../../../assets/capstoneimg.jpg"

export const EndPoint = () => {
  const target = useRef(null);

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });

  // 70vw ~ 100vw (스크롤 진행률 0~1 기준)
  const width = useTransform(scrollYProgress, [0.1, 0.4], ["80vw", "100vw"]);

  return (
    <div
      ref={target}
      className="flex w-screen  justify-center items-start relative"
    >
      <motion.div
        className="flex justify-center items-start overflow-hidden"
        style={{ width }}
      >
        <img
          className="w-screen object-cover filter dark:brightness-75"
          src={수업}
          alt="수업"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <h1 className="text-white text-4xl lg:text-7xl font-bold mb-4">
            꿈을 위한 도전
          </h1>

          <h1 className="text-white text-4xl lg:text-7xl font-bold">
            영진에서
          </h1>
        </div>
      </motion.div>
    </div>
  );
};
