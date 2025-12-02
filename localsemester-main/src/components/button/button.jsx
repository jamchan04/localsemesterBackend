export const Button = ({ children, type, onClick, className, ...props }) => {
  let style = `bg-button rounded-lg text-white py-2 hover:bg-button-hover font-medium ${
    className ? className : "w-full"
  }`;

  return (
    <button className={style} type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
