import React, { Dispatch, SetStateAction } from "react";
import { PiDotsThreeCircle } from "react-icons/pi";

type HeaderProps = {
  setShowComments: Dispatch<SetStateAction<string>>;
};

const Header = ({ setShowComments }: HeaderProps) => {

  //Handle cancel button to close comment section
  const handleCancel = () => {
    setShowComments("");
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
