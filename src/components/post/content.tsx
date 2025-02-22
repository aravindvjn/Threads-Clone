import React from "react";
import Image from "./image";

type MediaProps = {
  image_urls?: string[];
};



const Media = ({ image_urls = [] }: MediaProps) => {
  return (
    <div className="flex flex-col">
      {image_urls?.length > 0 && (
        <div className="flex pl-[67px] pr-[10px] gap-[10px] overflow-x-scroll">
          {image_urls.map((image_url, index) => (
            <Image key={index} url={image_url} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Media;
