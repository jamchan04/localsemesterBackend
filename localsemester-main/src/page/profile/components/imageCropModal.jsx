import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./mycrop.css";
import { useMyProfile } from "../../../store/myprofile";
import { SelectPhotoArea } from "./selectPhotoArea";
import { useFetch } from "../../../hooks/useFetch";
import { checkAuth } from "../../../auth/auth";

export const ImageCropper = ({ closeModal, id, editorHandler }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 0,
    height: 0,
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [size, setSize] = useState(false);
  const imgRef = useRef(null);
  const [image, setImage] = useState(false);
  const { editMyProfile } = useMyProfile();
  const { fetcher } = useFetch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImgSrc(reader.result.toString() || "");
    reader.readAsDataURL(file);
  };

  const onCropComplete = (c) => {
    if (!imgRef.current || !c.width || !c.height) return;

    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const canvas = document.createElement("canvas");
    canvas.width = c.width * scaleX;
    canvas.height = c.height * scaleY;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      c.x * scaleX,
      c.y * scaleY,
      c.width * scaleX,
      c.height * scaleY,
      0,
      0,
      c.width * scaleX,
      c.height * scaleY
    );

    const base64Image = canvas.toDataURL("image/jpeg");

    setPreviewUrl(base64Image);
  };

  //  편집할 사진 너비 높이 알아내서 박스 사이징 해줌
  const resizeBox = (e) => {
    const width = e.target.naturalWidth;
    const height = e.target.naturalHeight;

    if (height >= width) {
      setSize(true);
    } else {
      setSize(false);
    }
  };

  const selectImage = () => {
    setImgSrc(false);
    setImage(true);
  };

  const editProfilePhoto = async () => {
    const session = await checkAuth();

    if (!session) {
      alert("본인 인증에 실패했습니다.");
      return;
    }

    try {
      const getPhotoId = await fetch(`/user/${id}`);
      const res = await getPhotoId.json();

      if (typeof res.photoId === "number") {
        await fetcher({
          url: `/photo/${res.photoId}`,
          method: "PATCH",
          body: {
            src: previewUrl,
          },
        });
      } else {
        const postProfilePhoto = await fetch(`/photo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            src: previewUrl,
          }),
        });
        const response = await postProfilePhoto.json();

        await fetch(`/user/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ photoId: response.id }),
        });
      }
    } catch (error) {
      console.log("error : ", error);
    } finally {
      editMyProfile("profilePhoto", previewUrl);
      editorHandler(false);
      closeModal();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-2">
        <p
          className="font-semibold cursor-pointer text-brand-sub hover:text-red-700"
          onClick={() => closeModal()}
        >
          취소
        </p>
        <p className="font-bold text-brand dark:text-brand-dark">프로필 편집</p>
        {image ? (
          <p
            onClick={editProfilePhoto}
            className="font-semibold text-[#38b4ff] hover:text-[#31a2e6]"
          >
            완료
          </p>
        ) : (
          <p
            onClick={imgSrc ? selectImage : null}
            className={`font-semibold  ${
              imgSrc !== ""
                ? "text-[#38b4ff] hover:text-[#31a2e6]"
                : "text-brand-sub"
            }`}
          >
            확인
          </p>
        )}
      </div>
      {!imgSrc && (
        <div
          className={`h-[600px] w-[600px] flex justify-center items-center ${
            image ? "hidden" : null
          }`}
        >
          <SelectPhotoArea handleFileChange={handleFileChange} />
        </div>
      )}

      {imgSrc && (
        <div
          className={"h-[600px] w-[600px] flex justify-center items-center "}
        >
          <div
            className={
              size
                ? "h-full w-full flex justify-center items-center bg-black"
                : "w-full "
            }
          >
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={onCropComplete}
              aspect={1}
              circularCrop
              ruleOfThirds
            >
              <img
                className={size ? "h-[600px]" : "w-[600px]"}
                onLoad={(e) => resizeBox(e)}
                ref={imgRef}
                src={imgSrc}
                alt=""
              />
            </ReactCrop>
          </div>
        </div>
      )}

      {image && (
        <div className="h-[500px] w-[500px] lg:h-[600px] lg:w-[600px] relative flex justify-center items-center">
          <img className="h-full w-full" src={previewUrl} alt="미리보기" />
          <div className="absolute w-full h-full bg-black/50"></div>
          <img
            className="absolute h-full w-full rounded-full "
            src={previewUrl}
            alt="미리보기"
          />
        </div>
      )}
    </div>
  );
};
