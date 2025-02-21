import Image from "next/image";
import React from "react";

const ThreadImagePreview = ({ imageUrls }: { imageUrls: string[] }) => {
  if (imageUrls.length === 0) return null;

  return (
    <div className="flex overflow-x-scroll px-[20px] pl-[57px] gap-[15px]">
      {imageUrls.map((img, index) => (
        <Image
        className="object-cover border-foreground border overflow-hidden aspect-[3/4] rounded-lg min-w-[250px]"
          key={index}
          src={img}
          alt="selected images"
          height={400}
          width={400}
        />
      ))}
    </div>
  );
};

export default ThreadImagePreview;
