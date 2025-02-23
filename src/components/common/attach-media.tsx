"use client";
import React, { ChangeEvent,useRef } from "react";
import { MdOutlineGifBox, MdOutlineLocationOn } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import { BiPoll } from "react-icons/bi";
import { handleCompressImages } from "@/lib/helper/compress-images";
import { usePathname } from "next/navigation";
import { AttachMediaType } from "./type";


const AttachMedia = ({ setImageUrls, setImages }: AttachMediaType) => {

  const imageInputRef = useRef<HTMLInputElement>(null);

  //Get pathname for conditionally controlling the number of images
  const pathName = usePathname()
  let isMultiple = true;

  if(pathName ==='/'){
    isMultiple = false;
  }

  //Pick image by clicking the icon
  const pickImage = () => {
    imageInputRef.current?.click();
  };

  //handle Images
  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files.length > 0) {

      const files = Array.from(e.target.files);

      //Compress the selected images
      const compressedImageUrls = await handleCompressImages(files);

      //Convert the blog to images to store in db
      const compressedFiles = compressedImageUrls.map(
        (blob, index) =>
          new File([blob], files[index].name, { type: blob.type })
      );

      const dataTransfer = new DataTransfer();
      compressedFiles.forEach((file) => dataTransfer.items.add(file));

      if (setImages) {
        setImages(Array.from(dataTransfer.files));
      }
      
      //Extract the local link to show preview of the images
      const imagePathUrls = compressedImageUrls.map((file) =>
        URL.createObjectURL(file)
      );
      setImageUrls(imagePathUrls);
    }
  };

  return (
    <div className="flex items-center gap-5 opacity-60 py-[5px]">

      <input
        accept="image/*"
        multiple={isMultiple}
        onChange={handleImage}
        ref={imageInputRef}
        type="file"
        className="hidden"
        name="images"
      />

      <IoMdPhotos className="cursor-pointer" onClick={pickImage} size={25} />
      <MdOutlineGifBox size={25} />
      <BiPoll size={25} />
      <MdOutlineLocationOn size={25} />
      
    </div>
  );
};

export default AttachMedia;
