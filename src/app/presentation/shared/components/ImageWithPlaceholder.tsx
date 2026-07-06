import { useState } from "react";

type ImageWithPlaceholderProps = {
  src: string | null;
  alt: string;
  className?: string;
};

export function ImageWithPlaceholder({
  src,
  alt,
  className,
}: ImageWithPlaceholderProps) {
  const [isError, setIsError] = useState(false);

  const onError = () => {
    setIsError(true);
  };

  if (src !== null && src !== "" && !isError) {
    return <img src={src} alt={alt} className={className} onError={onError} />;
  }

  return (
    <svg className={`bg-blue-50 text-gray-600 rounded-xl ${className}`}>
      <use href="sprite.svg#polaroid" />
    </svg>
  );
}
