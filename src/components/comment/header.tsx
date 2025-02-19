import React, { Dispatch, SetStateAction } from "react";
import { PiDotsThreeCircle } from "react-icons/pi";

type HeaderProps = {
  setShowComments: Dispatch<SetStateAction<boolean>>;
};

const Header = ({ setShowComments }: HeaderProps) => {
  const handleCancel = () => {
    setShowComments(false);
  };

  return (
    <div className="relative flex text-[18px] justify-between p-[20px]">
      <button onClick={handleCancel}>Cancel</button>
      <p className="font-semibold absolute -translate-x-1/2 left-1/2">Reply</p>
      <button>
        <PiDotsThreeCircle size={25} />
      </button>
    </div>
  );
};

export default Header;
