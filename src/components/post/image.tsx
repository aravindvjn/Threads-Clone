"use client";
import React, { useState } from "react";
import NextImage from "next/image";
import { CgClose } from "react-icons/cg";

const Image = ({ url }: { url: string }) => {
  
  const [showFullImage, setShowFullImage] = useState<boolean>(false);

  return (
    <>
      {showFullImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 min-h-dvh flex justify-center items-center z-[1000] backdrop-blur-sm"
          onClick={() => setShowFullImage(false)} 
        >
          <CgClose
            onClick={() => setShowFullImage(false)}
            className="absolute top-4 right-4 text-white cursor-pointer"
            size={36}
          />
          <div className="relative w-[90vw] max-w-[500px] h-auto max-h-[90vh]">
            <NextImage
              className="object-contain rounded"
              src={url}
              alt="thread image"
              width={500}
              height={600}
            />
          </div>
        </div>
      )}
      <NextImage
        onClick={() => setShowFullImage(true)}
        className="w-[210px] h-[270px] border border-bordercolor aspect-[3/4] object-cover rounded-lg cursor-pointer"
        src={url}
        alt="thread image"
        width={300}
        height={600}
      />
    </>
  );
};

export default Image;
