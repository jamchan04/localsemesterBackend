import { saveSession } from "../../../auth/auth";
import { useMyProfile } from "../../../store/myprofile";
import getPhoto from "../../../util/getPhoto";

export const handleLoginSubmit = async (e, inputValue, callback) => {
  e.preventDefault();

  const userId = (inputValue.userId || "").trim();
  const password = (inputValue.password || "").trim();

  if (userId.length < 3 || password.length < 3) {
    alert("로그인 정보가 올바른지 다시 확인해주세요");
    return;
  }

  try {
    const request = await fetch(`/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        password,
      }),
    });

    if (!request.ok) {
      alert("로그인 정보가 올바른지 다시 확인해주세요");
      return;
    }

    const response = await request.json();
    const user = response.user;

    // 토큰을 저장해 두면 추후 인증이 필요한 요청에 활용 가능
    if (response.accessToken) {
      sessionStorage.setItem("accessToken", response.accessToken);
    }
    if (response.refreshToken) {
      sessionStorage.setItem("refreshToken", response.refreshToken);
    }

    const photo = await getPhoto(user?.photoId);

    const getSession = await saveSession({
      sessionId: Date.now(),
      uid: user.id,
    });
    if (getSession) {
      useMyProfile.getState().setMyProfile({
        id: user.id,
        username: user.username,
        email: user.email || "",
        state: user.state,
        profilePhoto: photo,
        message: user.message,
      });
      callback();
    } else {
      console.log("message :", getSession);
    }
  } catch (error) {
    console.log(error);
  }
};
