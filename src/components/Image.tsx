import React, { ImgHTMLAttributes, useState } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
}

export default function Image({
  src,
  alt,
  fill,
  className = '',
  priority,
  ...props
}: ImageProps) {
  const [error, setError] = useState(false);
  const fillClasses = fill ? 'absolute inset-0 w-full h-full object-cover' : '';

  // Fallback high quality travel & heritage image if seed image fails
  const fallbackSrc = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80';

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setError(true)}
      className={`${fillClasses} ${className}`}
      {...props}
    />
  );
}
