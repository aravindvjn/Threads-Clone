import React from "react";
import Image from "./image";
import { MediaProps } from "./type";


const Media = ({ image_urls = [] }: MediaProps) => {

  if(image_urls.length === 0) return null;
  
  return (
    <div className="flex flex-col">

        <div className="flex pl-[67px] pr-[10px] gap-[10px] overflow-x-scroll">
          {image_urls.map((image_url, index) => (
            <Image key={index} url={image_url} />
          ))}
        </div>
      
    </div>
  );
};

export default Media;
