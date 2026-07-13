type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
};

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-4",
  lg: "w-12 h-12 border-4",
};

export function LoadingSpinner({
  size = "md",
  className = "",
  label,
}: LoadingSpinnerProps) {
  return (
    <div
      data-testid="loading-spinner"
      className={`flex flex-1 flex-col items-center justify-center gap-2 ${className}`}
    >
      <div
        className={`
          ${sizeClasses[size]}
          animate-spin
          rounded-full
          border-gray-300
          border-t-blue-600
        `}
      />

      {label && <span className="text-sm text-gray-500">{label}</span>}
    </div>
  );
}
