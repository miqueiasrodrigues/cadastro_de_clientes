import React from "react";
import "./styles/card.css";

interface CardProps {
  width: number;
  height: number;
  children?: React.ReactNode;
  color?: string;
  justifyContent?: string;
  borderRadius?: number;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <section
      className="card"
      style={{
        height: `${props.height}%`,
        width: `${props.width}%`,
        backgroundColor: props.color,
        justifyContent: props.justifyContent,
        borderRadius: `${props.borderRadius}px`,
      }}
    >
      {props.children}
    </section>
  );
};

export default Card;
