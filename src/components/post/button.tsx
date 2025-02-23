import React from "react";
import { ButtonProps } from "./type";

const Button = ({ onClick, children, disabled }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
