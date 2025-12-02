import { Fragment } from "react";
import {
  BoldIcon,
  CenterIcon,
  ItalicIcon,
  LeftIcon,
  PhotoIcon,
  RightIcon,
  UnderLineIcon,
} from "./icons/icons";

export const MenuBar = ({ editor }) => {
  if (!editor) return null;

  // 버튼 정보 배열 (label + 클릭 액션)
  const editorButtons = [
    {
      label: "P",
      action: () => editor.chain().focus().unsetFontSize().run(),
    },
    {
      label: "H2",
      action: () => editor.chain().focus().setFontSize("24px").run(),
    },
    {
      label: "H1",
      action: () => editor.chain().focus().setFontSize("36px").run(),
    },

    {
      label: <BoldIcon />,
      action: () => editor.chain().focus().toggleBold().run(),
    },
    {
      label: <ItalicIcon />,
      action: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: <UnderLineIcon />,
      action: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      label: <LeftIcon />,
      action: () => editor.chain().focus().setTextAlign("left").run(),
    },
    {
      label: <CenterIcon />,
      action: () => editor.chain().focus().setTextAlign("center").run(),
    },
    {
      label: <RightIcon />,
      action: () => editor.chain().focus().setTextAlign("right").run(),
    },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;

      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        const isLandscape = width >= height;

        editor
          .chain()
          .focus()
          .setImage({
            src: base64Image,
            width: isLandscape ? "500px" : "auto",
            height: isLandscape ? "auto" : "500px",
          })
          .run();
      };
      img.src = base64Image;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex w-full my-4 gap-2">
      {editorButtons.map(({ label, action }, index) => (
        <Fragment key={index}>
          <button
            onClick={action}
            className="font-bold border w-10 h-10 flex justify-center dark:border-none items-center dark:bg-card-dark rounded opacity-60 hover:opacity-100"
          >
            {label}
          </button>
          {(index + 1) % 3 === 0 ? (
            <div className="mx-1 h-8 self-center w-[1px] bg-[#ededed]"></div>
          ) : null}
        </Fragment>
      ))}
      <label
        className="flex items-center w-10 h-10 justify-center border rounded cursor-pointer dark:border-none dark:bg-card-dark opacity-60 hover:opacity-100"
        htmlFor="img"
      >
        <PhotoIcon />
      </label>
      <input
        id="img"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};
