import dayjs from "dayjs";

export const createAt = () => {
  return dayjs().format("YYYY-MM-DD HH:mm:ss");
};
