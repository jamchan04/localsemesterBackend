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

// url 데이터를 보낼 table 이름
// exitPath 글 작성 완료나 나가기 버튼을 눌렀을 떄 갈 위치
// closeModal 모달안에서 처리할 때 모달 닫기
// callback 글쓰기가 완료된 뒤에 처리하고 싶은 내용 함수로 넣어주기
// className 글쓰기 폼의 천체 사이즈 조정하고 싶을 때 사용함
// init 게시글 한개
// post 글 작성이면 true 글 수정이면 false

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

    // 이미지 찾기 (첫 번째 이미지)
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
      const firstPhoto = await findFirstImageNode(editor.getJSON());

      let photoId = init?.photoId || "";

      if (firstPhoto) {
        const req = await fetch(
          `/photo/` + (method === "PATCH" ? init.photoId : ""),
          {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ src: firstPhoto.attrs.src }),
          }
        );
        const res = await req.json();
        photoId = res.id;
      }

      const article = editor.getText().split()[0];
      const src = editor.getJSON();

      if (
        !title.trim() ||
        !article.trim() ||
        !src.content ||
        src.content.length === 0
      ) {
        alert("작성을 완료해주세요");
        return;
      }

      const body = {
        title: title,
        article: article,
        createAt: createAt(),
        userId: id,
        src: src,
        photoId: photoId || "",
        username: username,
      };

      const req = await fetch(path, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const res = await req.json();
      if (res) {
        if (typeof callback === "function") return callback();

        nav(exitPath);
      }
    } catch (error) {
      console.error("오류:", error);

      alert("오류발생");
    }
  };

  return (
    <>
      <div className="p-4">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="w-full py-4 focus:outline-none dark:bg-brand-dark font-semibold text-3xl text-brand dark:text-brand-dark"
          placeholder="제목을 입력하세요"
        />
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      <div className="flex gap-2 justify-between border-t-2 pt-4 border-t-[#ededed] dark:border-t-[#161b22]">
        <Button
          className="w-32 bg-button-point hover:bg-button-pointHover"
          onClick={closeModal ? closeModal : () => nav(exitPath)}
        >
          나가기
        </Button>
        <Button className="w-32" onClick={createPosting}>
          발행하기
        </Button>
      </div>
    </>
  );
};

export default MyEditor;
