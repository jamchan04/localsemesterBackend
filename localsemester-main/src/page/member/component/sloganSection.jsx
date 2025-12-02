import React from "react";
import "../member.css";
import { AnimatedContainer } from "components/animationContainer/animationContainer";
const SloganSection = ({ slogan }) => (
  <AnimatedContainer delay={0.5}>
    <div className="bg-gradient-to-b from-white/0 transition-colors duration-500">
  <section className="py-16 px-4 flex items-center justify-center text-center min-h-[30vh]">
    <p className="text-xl md:text-3xl font-light max-w-3xl text-brand leading-snug whitespace-pre-wrap speed-text">
      {slogan}
    </p>
  </section>
</div>

  </AnimatedContainer>
);

export default SloganSection;
