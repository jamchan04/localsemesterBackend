export default async function getPhoto(id) {
  if (typeof id === "string") return "";

  try {
    const getPhoto = await fetch(`/photo?id=${id}`);
    const response = await getPhoto.json();

    if (response[0]?.src) {
      return response[0]?.src;
    }

    return "";
  } catch (error) {
    console.error(error);
  }
}
