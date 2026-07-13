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
    return <img data-testid='real-image' src={src} alt={alt} className={className} onError={onError} />;
  }

  return (
    <svg data-testid='image-placeholder' className={`bg-blue-50 text-gray-600  ${className}`}>
      <use href="/sprite.svg#polaroid" />
    </svg>
  );
}
