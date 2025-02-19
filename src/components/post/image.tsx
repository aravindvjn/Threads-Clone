import React from "react";
import NextImage from "next/image";
const Image = ({ url }: { url: string }) => {
  return (
    <NextImage
      className="w-[200px] aspect-[3/4] object-cover rounded-lg"
      src={url}
      alt="thread image"
      width={300}
      height={600}
    />
  );
};

export default Image;
