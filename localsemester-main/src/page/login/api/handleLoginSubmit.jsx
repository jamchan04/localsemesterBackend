import { saveSession } from "../../../auth/auth";
import { useMyProfile } from "../../../store/myprofile";
import getPhoto from "../../../util/getPhoto";

export const handleLoginSubmit = async (e, inputValue, callback) => {
  e.preventDefault();

  if (inputValue.userId.length < 4 || inputValue.password.length < 4) {
    alert("로그인 정보를 다시 확인해주세요");
    return;
  }

  try {
    const request = await fetch(`/user?userId=${inputValue.userId}`);
    const response = await request.json();

    if (
      response.length > 0 &&
      response[0].userId === inputValue.userId &&
      response[0].password === inputValue.password
    ) {
      const photo = await getPhoto(response[0].photoId);

      const getSession = await saveSession({
        sessionId: Date.now(),
        uid: response[0].id,
      });
      if (getSession) {
        useMyProfile.getState().setMyProfile({
          id: response[0].id,
          username: response[0].username,
          email: response[0].email || "",
          state: response[0].state,
          profilePhoto: photo,
          message: response[0].message,
        });
        callback();
      } else {
        console.log("message :", getSession);
      }
    } else {
      alert("로그인 정보를 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};
