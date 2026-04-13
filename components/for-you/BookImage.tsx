"use client";

import { useEffect, useState } from "react";
import Skeleton from "../skeleton/Skeleton";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  skeletonClassName?: string;
};

function BookImage({
  src,
  alt = "",
  className = "",
  skeletonClassName = "",
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [src]);

  return isLoaded ? (
    <img className={className} src={src} alt={alt} loading="lazy" />
  ) : (
    <Skeleton className={skeletonClassName} />
  );
}

export default BookImage;