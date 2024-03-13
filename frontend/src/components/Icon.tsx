import React from "react";
import "./styles/icon.css";
import { Link } from "react-router-dom";

interface IconProps {
  title: string;
  imageUri: string;
  alt: string;
  proportion: number;
  to: string;
  action?: () => void;
}

const Icon: React.FC<IconProps> = (props) => {
  return (
    <Link to={props.to}>
      <img
        className="icon"
        title={props.title}
        width={`${props.proportion}px`}
        height={`${props.proportion}px`}
        src={props.imageUri}
        alt={props.alt}
        onClick={props.action}
      />
    </Link>
  );
};

export default Icon;
