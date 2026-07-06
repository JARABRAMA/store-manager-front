export type IconSize = "sm" | "md" | "lg" | "xl";
export type IconButtonProps = {
  icon: string;
  onClick: () => void;
  className?: string;
  size?: IconSize;
};

const iconSizes = {
  sm: "size-6",
  md: "size-8",
  lg: "size-12",
  xl: "size-24",
};

export function IconButton({
  icon,
  onClick,
  className,
  size = "sm",
}: IconButtonProps) {
  return (
    <button type="button" onClick={onClick} className={className}>
      <svg className={`${iconSizes[size]}`}>
        <use href={icon} />
      </svg>
    </button>
  );
}
