import React from "react";

export const Footer = React.memo(() => {
  const icons = [
    {
      src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
      alt: "React",
      className: "w-8 h-8",
    },
    {
      src: "https://ko.redux.js.org/img/redux.svg",
      alt: "Redux",
      className: "w-8 mx-3",
    },
    {
      src: "https://images.seeklogo.com/logo-png/43/2/tailwind-css-logo-png_seeklogo-434090.png",
      alt: "Tailwind",
      className: "w-20 ",
    },
    {
      src: "https://blog.kakaocdn.net/dn/c6iYkh/btsHGAFFlRR/azRoShzk9xNeTJizFBh2O1/img.png",
      alt: "Zustand",
      className: "w-12 h-8",
    },
  ];

  return (
    <footer className="w-screen h-36 flex justify-center items-center dark:bg-brand-dark ">
      <div className="w-[1200px] h-36 border-t border-[#ededed] dark:border-[#3d3d3d] px-2 py-5 grid grid-cols-2 gap-4">
        {/* 왼쪽 영역 */}
        <div className="text-sm text-[#8b95a1]">
          <p>service | maruta company</p>
          <p>Tech Stack | react redux/toolkit zustand tailwindcss</p>
          <div className="w-full h-10 mt-4 hidden md:flex items-center">
            {icons.map((icon, idx) => (
              <img
                key={idx}
                src={icon.src}
                alt={icon.alt}
                className={icon.className}
              />
            ))}
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="text-sm text-[#333d4b] dark:text-brand-dark">
          <p>
            team_untity
            <br />
            Copyright ⓒ Untity2. All Rights Reserved
          </p>
          <p className="pt-3 text-[#8b95a1] hidden sm:block">
            영진전문대학교 글로벌캠퍼스 | 영진전문대학교 복현캠퍼스
          </p>
          <p className="text-[#8b95a1] hidden lg:block">
            주소 : 대구광역시 북구 복현로 35 (복현동, 영진전문대학) | 우편번호 :
            (41527)
          </p>
        </div>
      </div>
    </footer>
  );
});
