import React from "react";

const Image = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="max-w-full h-auto align-middle flex-shrink-0 object-center shadow-sm rounded"
    />
  );
};

export default Image;