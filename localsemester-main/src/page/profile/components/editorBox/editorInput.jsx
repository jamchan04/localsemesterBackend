export const EditorInput = ({ onChange, value, ...props }) => {
  return (
    <>
      <input
        className="bg-brand-point dark:bg-card-dark"
        value={value}
        onChange={onChange}
        {...props}
      />
    </>
  );
};
