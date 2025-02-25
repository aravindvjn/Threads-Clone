"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoAddOutline, IoPerson, IoPersonOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const Footer = () => {
  const pathName = usePathname();

  return (
    <motion.div
      initial={{ translateY: "100%" }}
      animate={{ translateY: "0%" }}
      transition={{
        bounce: false,
      }}
      className="fixed sm:flex-col -bottom-1 w-full sm:w-[60px] sm:left-0 bg-background border-gray-400/20 h-[60px] sm:h-full flex justify-around items-center sm:bg-[#080808] sm:gap-2" 
    >
      <div></div>
      {navLinks.map((link) => (
        <motion.div whileTap={{ scale: 1.1 }} key={link.path}>
          <Link href={link.path}>
            {pathName === link.path ? link.focusIcon : link.icon}
          </Link>
        </motion.div>
      ))}
      <div></div>
    </motion.div>
  );
};

export default Footer;

const navLinks = [
  {
    path: "/",
    icon: <GoHome size={28} />,
    focusIcon: <GoHomeFill size={28} />,
  },
  {
    path: "/search",
    icon: <CiSearch size={28} />,
    focusIcon: <CiSearch size={28} />,
  },
  {
    path: "/new-thread",
    icon: <IoAddOutline size={32} />,
    focusIcon: <IoAddOutline size={32} />,
  },
  {
    path: "/activity",
    icon: <IoIosHeartEmpty size={28} />,
    focusIcon: <IoMdHeart size={28} />,
  },
  {
    path: "/profile",
    icon: <IoPersonOutline size={28} />,
    focusIcon: <IoPerson size={28} />,
  },
];
