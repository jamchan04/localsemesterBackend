import { createPortal } from "react-dom";

export const Modal = ({ children, closeModal, className }) => {
  const modalRoot = document.querySelector("#modal");
  return createPortal(
    <div
      className="fixed flex top-0 bg-[#000000ad] w-screen h-screen z-50 cursor-pointer justify-center items-center"
      onClick={closeModal}
    >
      <div
        className={`bg-white dark:bg-card-dark dark:text-brand-dark p-4 rounded-lg ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};
