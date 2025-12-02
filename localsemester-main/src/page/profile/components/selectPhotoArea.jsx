import { Button } from "../../../components/button/button";
import { CameraIcon } from "./icon/cameraIcon";

export const SelectPhotoArea = ({ handleFileChange }) => {
  return (
    <label htmlFor="img" className="cursor-pointer">
      <div className="flex flex-col justify-center items-center">
        <CameraIcon />
        <p className="text-lg font-bold mb-8 dark:text-brand-sub">
          업로드할 사진을 선택해주세요
        </p>
        <Button className="w-28 text-sm">
          <label htmlFor="img" className="cursor-pointer">
            사진 선택하기
            <input
              className="hidden"
              id="img"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </Button>
      </div>
    </label>
  );
};
