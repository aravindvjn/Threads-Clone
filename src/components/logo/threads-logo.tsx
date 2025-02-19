import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.png";
const ThreadsLogo = ({
  size = 35,
  classNames,
}: {
  size?: number;
  classNames?: string;
}) => {
  const width = (30.11 / 35) * size;

  return (
    <Image
      src={logo.src}
      height={size}
      width={width}
      className={classNames}
      alt="Threads Logo"
      style={{
        objectFit: "contain",
        height: size,
        width,
      }}
    />
  );
};

export default ThreadsLogo;
