import { redirect } from "react-router-dom";
import { useMyProfile } from "store/myprofile";

export const localSemesterLoader = async () => {
  const { state } = useMyProfile.getState().getMyProfile();
  if (state !== 777) {
    alert("로컬학기 게시판은 관리자만 접근 가능합니다.");
    return redirect("/");
  }
};
// 로컬학기 게시판은 관리자만 접근 가능
// 만약 관리자가 아니라면 이전 페이지로 리다이렉트
// 관리자 상태는 useMyProfile에서 가져옴
// state가 777인 경우에만 접근 가능
// 그 외의 경우에는 -1로 리다이렉트
