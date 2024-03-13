import React from "react";
import "./styles/list.css";

interface ListProps {
  children?: React.ReactNode;
  width: number;
  height: number;
  color?: string;
}

const List: React.FC<ListProps> = (props) => {
  return (
    <div
      className="list"
      style={{
        height: `${props.height}%`,
        width: `${props.width}%`,
        backgroundColor: props.color,
      }}
    >
      {props.children}
    </div>
  );
};

export default List;
