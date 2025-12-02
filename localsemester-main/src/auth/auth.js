// 세션 체크하는 함수
export const checkSession = async () => {
  const session = sessionStorage.getItem("sessionId");
  const uid = sessionStorage.getItem("uid");
  if (!session) return false;

  try {
    const req = await fetch(`/session?sessionId=${session}`);
    const res = await req.json();

    if (res[0].sessionId === Number(session) || res[0].uid === Number(uid)) {
      return true;
    }

    return false;
  } catch (err) {
    console.error("세션 체크 중 오류:", err);
    return false;
  }
};

// crud 시 인증하기
export const checkAuth = async () => {
  const uid = sessionStorage.getItem("uid");
  const sessionId = sessionStorage.getItem("sessionId");
  if (!uid || !sessionId) return false;

  try {
    const req = await fetch(`/session?uid=${uid}&sessionId=${sessionId}`);
    const res = await req.json();

    if (res[0].uid === Number(uid) && res[0].sessionId === Number(sessionId)) {
      return true;
    }

    return false;
  } catch (err) {
    console.error("세션 체크 중 오류:", err);
    return false;
  }
};

// 세션 저장 함수 (로그인 시)
export const saveSession = async (sessionData) => {
  const req = await fetch(`/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sessionData),
  });
  const res = await req.json();

  if (!res) return false;

  sessionStorage.setItem("sessionId", res.sessionId);
  sessionStorage.setItem("uid", res.uid);

  return true;
};

// 세션 제거 함수 (로그아웃 시)
export const clearSession = async () => {
  const mySession = sessionStorage.getItem("sessionId");

  try {
    const getSessionIndex = await fetch(`/session?sessionId=${mySession}`);
    const response = await getSessionIndex.json();

    const sessionIndex = response[0].id;

    await fetch(`/session/${sessionIndex}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("로그아웃 오류 : ", error);
  } finally {
    sessionStorage.removeItem("sessionId");
    sessionStorage.removeItem("uid");
  }
};
