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
      className="fixed -bottom-1 w-full bg-background border-gray-400/20 h-[60px] flex justify-around items-center"
    >

      {navLinks.map((link) => (
        <motion.div whileTap={{ scale: 1.1 }} key={link.path}>
          <Link href={link.path}>
            {pathName === link.path ? link.focusIcon : link.icon}
          </Link>
        </motion.div>
      ))}

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
    path: "/@username",
    icon: <IoPersonOutline size={28} />,
    focusIcon: <IoPerson size={28} />,
  },
];
