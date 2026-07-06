export type InputProps = {
  name: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  className?: string;
  type?: React.HTMLInputTypeAttribute;
};
export function Input({
  name,
  required = false,
  placeholder,
  label,
  className,
  type = "text",
}: InputProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label>{label}</label>}
      <input
        type={type}
        className="rounded-md border px-2 py-1 border-gray-300"
        name={name}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}
