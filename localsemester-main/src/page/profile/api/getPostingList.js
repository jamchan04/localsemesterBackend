export const getPostingList = async (id) => {
  try {
    const req = await fetch(`/post?userId=${id}`);
    const res = await req.json();
    const response = res?.reverse();
    return response;
  } catch (error) {
    console.log(error);
  }
};
