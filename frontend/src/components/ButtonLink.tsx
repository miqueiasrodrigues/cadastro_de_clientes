import React from "react";
import "./styles/button.css";
import { ButtonType } from "../models/types/ButtonType";
import { Link } from "react-router-dom";

interface ButtonLinkProps {
  color?: string;
  fontColor?:string
  children?: React.ReactNode;
  width: number;
  height: number;
  href: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = (props) => {
  return (
    <Link
     to={props.href}
     className="button"
     style={{
       backgroundColor: props.color,
       width: `${props.width}px`,
       height: `${props.height}px`,
       color:props.fontColor
     }}
    >
      {props.children}
    </Link>
  );
};

export default ButtonLink;
