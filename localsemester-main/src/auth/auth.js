// 세션 체크: 클라이언트에 저장된 세션 값만 있으면 통과시킵니다.
export const checkSession = async () => {
  const session = sessionStorage.getItem("sessionId");
  const uid = sessionStorage.getItem("uid");
  if (!session || !uid) return false;
  return true;
};

// CRUD 인증 확인: 클라이언트 세션 값만 확인
export const checkAuth = async () => {
  const uid = sessionStorage.getItem("uid");
  const sessionId = sessionStorage.getItem("sessionId");
  if (!uid || !sessionId) return false;
  return true;
};

// 세션 저장 (로그인 시)
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

// 세션 제거 (로그아웃 시)
export const clearSession = async () => {
  const mySession = sessionStorage.getItem("sessionId");

  try {
    const getSessionIndex = await fetch(`/session?sessionId=${mySession}`);
    const response = await getSessionIndex.json();

    const sessionIndex =
      Array.isArray(response) && response.length > 0 ? response[0].id : null;

    if (sessionIndex) {
      await fetch(`/session/${sessionIndex}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("로그아웃 오류 : ", error);
  } finally {
    sessionStorage.removeItem("sessionId");
    sessionStorage.removeItem("uid");
  }
};
