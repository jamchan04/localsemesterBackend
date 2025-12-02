import { AnimatedContainer } from "../../../components/animationContainer/animationContainer";

export const Intro = ({ src, title, subtitle, children, alt, right }) => {
  
  return (
    <div className={"flex w-full justify-around h-screen items-center " + right ? "flex-row-reverse":""}>
      <div className=" flex h-full flex-col items-start ">
        <AnimatedContainer>
          <p className="my-10 text-[#38b4ff] font-bold text-2xl pt-40">
            {title}
          </p>
        </AnimatedContainer>

        <AnimatedContainer delay={0.2}>
          <article className="text-brand-sub text-xl font-medium">
            <p className="text-3xl font-bold mb-4 text-brand dark:text-brand-dark">
              {subtitle}
            </p>
            {children}
          </article>
        </AnimatedContainer>
      </div>

      <div className="flex h-full w-[600px] items-end pb-20">
        <AnimatedContainer delay={0.4}>
          <div className="rounded-lg overflow-hidden shadow-3xl dark:shadow-dark">
            <img className="w-full" src={src} alt={alt} />
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
};
