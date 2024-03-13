import React from "react";
import "./styles/header.css";

interface HeaderProps {
  children?: React.ReactNode;
  height: number;
  width: number;
  color?: string;
  fontColor?:string
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header
      className="header"
      style={{
        height: `${props.height}%`,
        width: `${props.width}%`,
        backgroundColor: props.color,color:props.fontColor
      }}
    >
      {props.children}
    </header>
  );
};

export default Header;
