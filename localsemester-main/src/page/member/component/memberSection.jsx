import React from "react";
import ProfileText from "./profileText";
import ProfileImage from "./profileImage";
import { AnimatedContainer } from "components/animationContainer/animationContainer";

const MemberSection = ({ member, index, sectionRef, onClick}) => {
  return (
    <AnimatedContainer delay={0.5}>
      <section
        ref={sectionRef}
        className="py-20 px-4 md:px-10 flex flex-col md:flex-row gap-x-4 items-center max-w-6xl mx-auto cursor-pointer transition-all duration-500"
        onClick={onClick}
        style={{
          borderBottom: "none",
        }}
      >
        {index % 2 === 0 ? (
          <>
            <ProfileImage photo={member.photo} />
            <ProfileText username={member.username} article={member.article} />
          </>
        ) : (
          <>
            <ProfileText username={member.username} article={member.article} />
            <ProfileImage photo={member.photo} />
          </>
        )}
      </section>
    </AnimatedContainer>
  );
};

export default MemberSection;
