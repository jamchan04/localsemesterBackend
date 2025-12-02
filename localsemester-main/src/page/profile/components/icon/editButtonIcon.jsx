import { useNavigate } from "react-router-dom";
import { Modal } from "../../../../components/modal/modal";
import { useModal } from "../../../../hooks/useModal";
import { clearSession } from "../../../../auth/auth";
import { OptionModal } from "../../../../components/modal/optionModal";

export const EditButtonIcon = ({ editorHandler, id }) => {
  const { isModal, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const onLogOut = () => {
    clearSession();
    navigate("/login", { replace: true });
  };

  const editLoginInf = () => {
    navigate(`/account/${id}`);
  };

  const list = [
    {
      name: "프로필 사진 변경",
      action: editorHandler,
    },
    {
      name: "회원정보 변경",
      action: () => navigate(`/account/${id}`),
    },
    {
      name: "로그인 정보 변경",
      action: editLoginInf,
    },
    {
      name: "로그아웃",
      action: onLogOut,
    },
  ];

  return (
    <>
      {isModal && (
        <Modal closeModal={closeModal}>
          <OptionModal list={list} closeModal={closeModal}>
            설정
          </OptionModal>
        </Modal>
      )}
      <div
        onClick={openModal}
        className="bg-brand-point hover:opacity-50 cursor-pointer dark:bg-card-dark dark:hover:bg-card-hover text-base text-right rounded-lg p-1"
      >
        <SettingIcon />
      </div>
    </>
  );
};

const SettingIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`size-6 w-6`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
      />
    </svg>
  );
};
