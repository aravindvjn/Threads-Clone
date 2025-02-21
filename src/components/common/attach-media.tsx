"use client";
import React, { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import { MdOutlineGifBox, MdOutlineLocationOn } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import { BiPoll } from "react-icons/bi";
import { handleCompressImages } from "@/lib/helper/compress-images";

type AttachMediaType = {
  setImageUrls: Dispatch<SetStateAction<string[]>>;
};
const AttachMedia = ({ setImageUrls }: AttachMediaType) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const pickImage = () => {
    imageInputRef.current?.click();
  };

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);

      const compressedImageUrls = await handleCompressImages(files)

      const compressedFiles = compressedImageUrls.map((blob, index) => 
        new File([blob], files[index].name, { type: blob.type })
      );
      
      const dataTransfer = new DataTransfer();
      compressedFiles.forEach((file) => dataTransfer.items.add(file));

      if (imageInputRef.current) {
        imageInputRef.current.files = dataTransfer.files;
      }

      const imagePathUrls = compressedImageUrls.map((file) => URL.createObjectURL(file)); 
      setImageUrls(imagePathUrls); 
    }
  };

  return (
    <div className="flex items-center gap-5 opacity-60 py-[5px]">

      <input accept="image/*" multiple onChange={handleImage} ref={imageInputRef} type="file" className="hidden" name="images" />

      <IoMdPhotos className="cursor-pointer" onClick={pickImage} size={25} />
      <MdOutlineGifBox size={25} />
      <BiPoll size={25} />
      <MdOutlineLocationOn size={25} />
    </div>
  );
};

export default AttachMedia;
