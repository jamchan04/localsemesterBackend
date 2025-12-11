// MyEditor.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { MenuBar } from "./components/menuBar";
import { CustomImage } from "./components/customImageExtansion";
import { Button } from "../../button/button";
import FontSize from "./components/customFontSize";
import Underline from "@tiptap/extension-underline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAt } from "../../../util/createAt";
import { useMyProfile } from "../../../store/myprofile";

const MyEditor = ({ url, exitPath, closeModal, callback, init, post }) => {
  const [title, setTitle] = useState(init?.title || "");
  const nav = useNavigate();
  const { id, username } = useMyProfile((state) => state.myProfile);

  const method = post ? "POST" : "PATCH";
  const path = post ? `${url}` : `${url}/${init?.id}`;

  const editor = useEditor({
    extensions: [
      StarterKit,
      FontSize,
      Placeholder.configure({
        placeholder: "글 작성...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CustomImage,
      Underline,
    ],
    content: init?.src || "",
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  const createPosting = async () => {
    if (!editor) return;

    if (!id) {
      alert("로그인이 필요합니다.");
      return;
    }

    const findFirstImageNode = (node) => {
      if (!node) return null;
      if (node.type === "image") return node;

      if (node.content && Array.isArray(node.content)) {
        for (const child of node.content) {
          const found = findFirstImageNode(child);
          if (found) return found;
        }
      }

      return null;
    };

    try {
      const firstPhoto = findFirstImageNode(editor.getJSON());

      let photoId = init?.photoId || null;

      if (firstPhoto) {
        const hasPhotoId = !!init?.photoId;
        const photoUrl =
          method === "PATCH" && hasPhotoId ? `/photo/${init.photoId}` : `/photo`;
        const photoMethod =
          method === "PATCH" && hasPhotoId ? "PATCH" : "POST";

        const req = await fetch(photoUrl, {
          method: photoMethod,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ src: firstPhoto.attrs.src }),
        });
        if (req.ok) {
          const res = await req.json();
          photoId = res.id;
        } else {
          console.error("photo upload failed", req.status);
        }
      }

      const article = editor.getText();
      const src = editor.getJSON();

      if (!title.trim() || !article.trim() || !src.content || src.content.length === 0) {
        alert("내용을 입력해주세요");
        return;
      }

      const body = {
        title: title,
        article: article,
        createAt: createAt(),
        userId: Number(id),
        src: src,
        photoId: photoId ?? null,
        username: username,
      };

      const req = await fetch(path, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!req.ok) {
        console.error("post create failed", req.status);
        alert("게시글 생성에 실패했습니다.");
        return;
      }

      const res = await req.json();
      if (res && typeof callback === "function") return callback();
      nav(exitPath);
    } catch (error) {
      console.error("오류:", error);

      alert("오류 발생");
    }
  };

  return (
    <>
      <div className="p-4">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="w-full py-4 focus:outline-none dark:bg-brand-dark font-semibold text-3xl text-brand dark:text-brand-dark"
          placeholder="제목을 입력해주세요"
        />
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      <div className="flex gap-2 justify-between border-t-2 pt-4 border-t-[#ededed] dark:border-t-[#161b22]">
        <Button
          className="w-32 bg-button-point hover:bg-button-pointHover"
          onClick={closeModal ? closeModal : () => nav(exitPath)}
        >
          취소
        </Button>
        <Button className="w-32" onClick={createPosting}>
          완료
        </Button>
      </div>
    </>
  );
};

export default MyEditor;
