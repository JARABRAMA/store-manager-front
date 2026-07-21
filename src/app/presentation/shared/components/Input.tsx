import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export type InputProps<T extends FieldValues> = {
  name: Path<T>;
  required?: boolean;
  placeholder?: string;
  label?: string;
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  register: UseFormRegister<T>;
  error?: FieldError;
};

export function Input<T extends FieldValues>({
  name,
  required = false,
  placeholder,
  label,
  className,
  type = "text",
  register,
  error = undefined,
}: InputProps<T>) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label>{label}</label>}
      <input
        {...register(name)}
        data-testid={`input-${name}`}
        type={type}
        className="rounded-md border px-2 py-1 border-gray-300"
        required={required}
        placeholder={placeholder}
      />
      {error && (
        <span data-testid={`input-error-${name}`} className="text-red-400">
          {error.message}
        </span>
      )}
    </div>
  );
}
