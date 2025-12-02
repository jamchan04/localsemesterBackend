import React from "react";

const ProfileText = ({ username, article }) => (
  <div className="flex-1 max-w-xl px-4 md:px-8 flex flex-col justify-center">
  <h2 className="text-3xl md:text-4xl font-medium mb-2 text-left">
    {username}
  </h2>
  <p className="text-base md:text-lg text-brand-sub leading-relaxed whitespace-pre-wrap text-left">
    {article}
  </p>
</div>
);

export default ProfileText;
