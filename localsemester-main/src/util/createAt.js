import dayjs from "dayjs";

export const createAt = () => {
  // 현재 로컬 시간
  return dayjs().format("YYYY-MM-DD HH:mm:ss");
};
