import { withApiBase } from "./apiClient";

export default async function getPhoto(id) {
  // If already a URL/path, normalize with base if needed.
  if (typeof id === "string") return withApiBase(id);

  try {
    const getPhoto = await fetch(`/photo?id=${id}`);
    const response = await getPhoto.json();

    if (response[0]?.src) {
      return withApiBase(response[0]?.src);
    }

    return "";
  } catch (error) {
    console.error(error);
  }
}
