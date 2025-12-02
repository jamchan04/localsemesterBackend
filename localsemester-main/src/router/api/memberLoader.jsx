import getPhoto from "../../util/getPhoto";

export const memberLoader = async () => {
  try {
    const [memberRes, userRes] = await Promise.all([
      fetch("http://localhost:5000/member"),
      fetch("http://localhost:5000/user"),
    ]);

    const [members, users] = await Promise.all([
      memberRes.json(),
      userRes.json(),
    ]);

    const mergedMembers = await Promise.all(
      members.map(async (member) => {
        const user = users.find((u) => u.id === member.userId);

       
        const photo = user?.photoId
          ? await getPhoto(user.photoId)
          : "";

        return {
          id: member.id,
          username: user?.username || "알 수 없음",
          article: member.article,
          photo, 
        };
      })
    );

    return mergedMembers;
  } catch (error) {
    console.error("멤버 로딩 오류:", error);
    return [];
  }
};
