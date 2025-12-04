export default async function getPhoto(id) {
  // If already a URL/path, return as-is
  if (typeof id === "string") return id;

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
