import React from "react";

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

const Button = ({ onClick, children, disabled }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
