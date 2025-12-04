import getPhoto from "../../util/getPhoto";
import defaultImg from "../../assets/originalimg.png";

export const memberLoader = async () => {
  try {
    const [memberRes, userRes] = await Promise.all([
      fetch("/member"),
      fetch("/user"),
    ]);

    const [members, users] = await Promise.all([
      memberRes.json(),
      userRes.json(),
    ]);

    const mergedMembers = await Promise.all(
      members.map(async (member) => {
        const user = users.find((u) => u.id === member.userId);
        let photo = defaultImg;
        if (user?.photoId) {
          const url = await getPhoto(user.photoId);
          photo = url || defaultImg;
        }

        return {
          id: member.id,
          userId: member.userId,
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
