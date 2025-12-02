export const Input = ({
  placeholder,
  children,
  value,
  onChange,
  className = "",
  id,
  error,
  maxLength,
  minLength,
  message,
  type,
  ...props
}) => {
  return (
    <div className="flex flex-col my-2">
      <label
        className="text-brand-sub text-sm font-medium ml-1 mb-1"
        htmlFor={id}
      >
        {children}
      </label>
      <input
        htmlFor={id}
        className={`border rounded-lg px-2 py-2 w-full focus: outline-none dark:bg-card-hover dark:border-none dark:text-brand-sub ${className}`}
        placeholder={placeholder}
        value={value ?? ""}
        type={type}
        onChange={onChange}
        maxLength={maxLength}
        minLength={minLength}
        {...props}
      />
      {error && (
        <p className="text-red-700 text-sm pl-1 font-medium">{message}</p>
      )}
    </div>
  );
};
