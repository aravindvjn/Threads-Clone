import React from "react";
import Image from "./image";

type MediaProps = {
  image_urls?: string[];
};

const images = [
  "https://images.pexels.com/photos/30773764/pexels-photo-30773764/free-photo-of-vibrant-outdoor-fashion-shoot-with-red-accents.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
  "https://images.pexels.com/photos/30720431/pexels-photo-30720431/free-photo-of-scenic-beach-day-in-monterosso-al-mare-italy.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
];

const Media = ({ image_urls = images || [] }: MediaProps) => {
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
