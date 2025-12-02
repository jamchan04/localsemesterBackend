import { useMyProfile } from "../../../store/myprofile";
import defaultPhoto from "../../../assets/originalimg.png";
import { useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/modal/modal";
import { ImageCropper } from "./imageCropModal";
import { EditButtonIcon } from "./icon/editButtonIcon";
import { PlusIcon } from "./icon/plusIcon";

export const MyProfileArea = () => {
  const { id, message, username, profilePhoto } = useMyProfile(
    (state) => state.myProfile
  );
  const [edit, setEdit] = useState(false);
  const { isModal, closeModal, openModal } = useModal();

  const editorHandler = () => {
    setEdit((state) => !state);
  };

  return (
    <>
      {isModal && (
        <Modal closeModal={closeModal}>
          <ImageCropper
            editorHandler={editorHandler}
            closeModal={closeModal}
            id={id}
          />
        </Modal>
      )}
      <div className="flex flex-col my-4 justify-center items-center h-96">
        <div className="relative flex w-full justify-center h-[330px]">
          <div className="flex justify-center items-center w-48 h-48  relative">
            <img
              onClick={edit ? openModal : null}
              className="object-cover w-48 h-48 z-[2] overflow-hidden rounded-full cursor-pointer"
              src={profilePhoto ? profilePhoto : defaultPhoto}
              alt="profilePhoto"
            />
            {edit ? (
              <PlusIcon
                onClick={openModal}
                className="absolute h-full w-full right-0 bottom-0 flex justify-center items-center bg-black/50 z-[3] cursor-pointer hover:opacity-80 rounded-full"
              />
            ) : null}
          </div>
          <div className="absolute bottom-0 z-[1] h-56 w-96 rounded-xl bg-brand-point dark:bg-card-dark flex flex-col justify-start ">
            <div className="p-2 flex items-center justify-end">
              {edit ? (
                <p
                  onClick={() => editorHandler()}
                  className="text-sm cursor-pointer p-1 h-8 text-[#38b4ff] hover:opacity-80"
                >
                  취소
                </p>
              ) : (
                <EditButtonIcon
                  className="w-6"
                  editorHandler={editorHandler}
                  id={id}
                />
              )}
            </div>
            <div className="text-center mt-14">
              <p className="text-3xl font-bold ">{username}</p>
              <p className="my-4 text-brand-sub">
                {message ? message : `${username}의 프로필`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
