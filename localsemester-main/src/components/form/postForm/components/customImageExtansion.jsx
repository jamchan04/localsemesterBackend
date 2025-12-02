import { Image } from "@tiptap/extension-image";

export const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "500px",
        parseHTML: (element) => element.style.width || "500px",
        renderHTML: (attributes) => {
          return {
            style: `width: ${attributes.width}; height: auto; object-fit: cover;`,
          };
        },
      },
      height: {
        default: "auto",
        parseHTML: (element) => element.style.height || "auto",
        renderHTML: (attributes) => {
          // height가 auto면 스타일에 안 넣어도 되니까 조건 처리
          if (attributes.height && attributes.height !== "auto") {
            return { style: `height: ${attributes.height};` };
          }
          return {};
        },
      },
    };
  },
});
