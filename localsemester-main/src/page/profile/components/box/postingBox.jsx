import { useEffect, useState } from "react";
import { Modal } from "../../../../components/modal/modal";
import { useModal } from "../../../../hooks/useModal";
import { fromNow } from "../../../../util/fromNow";
import getPhoto from "../../../../util/getPhoto";
import { PostViewer } from "../../../../components/form/postForm/postViewer";

export const PostingBox = ({ item, me, deletePosting: del }) => {
  const { isModal, openModal, closeModal } = useModal();
  const [background, setBackground] = useState("");

  useEffect(() => {
    const getBackground = async () => {
      const background = await getPhoto(item.photoId);
      setBackground(background);
    };
    getBackground();
  }, [item.photoId]);

  return (
    <>
      {isModal && (
        <Modal closeModal={closeModal} className="h-3/4 flex gap-4">
          <PostViewer
            item={item}
            me={me}
            deletePosting={() => {
              del(item.id);
              closeModal();
            }}
            url="/post"
          />
        </Modal>
      )}
      <div
        onClick={openModal}
        className="grid grid-rows-[2fr_1fr] aspect-square overflow-hidden border dark:border-[#161b22] rounded-md cursor-pointer hover:opacity-75"
      >
        <div
          className="relative flex justify-center items-center bg-black/80"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <p className="absolute text-base md:text-xl lg:text-2xl font-bold text-brand-dark line-clamp-1 px-2 ">
            {item.title}
          </p>
        </div>
        <div className="flex h-full rounded-b-md flex-col justify-between bg-brand-point dark:bg-card-dark p-2">
          <article className="text-sm line-clamp-2 text-brand-sub lg:line-clamp-3">
            {item.article}
          </article>
          <div className="text-sm flex pt-1 justify-between border-t-[1px] dark:border-[#0d1117] py-1 text-brand-sub">
            <p>by {item.username}</p>
            <p>{fromNow(item.createAt)}</p>
          </div>
        </div>
      </div>
    </>
  );
};
