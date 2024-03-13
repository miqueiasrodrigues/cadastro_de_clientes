import React from "react";
import "./styles/button.css";
import { ButtonType } from "../models/types/ButtonType";

interface ButtonProps {
  color?: string;
  children?: React.ReactNode;
  width: number;
  height: number;
  type?: ButtonType;
  action?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      type={props.type ? props.type : "button"}
      className="button"
      style={{
        backgroundColor: props.color,
        width: `${props.width}px`,
        height: `${props.height}px`,
      }}
      onClick={props?.action}
    >
      {props.children}
    </button>
  );
};

export default Button;
