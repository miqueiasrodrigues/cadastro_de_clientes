import React from "react";

interface BoxProps {
  width?: number;
  height?: number;
}

const Box: React.FC<BoxProps> = (props) => {
  return (
    <div
      style={{ width: `${props.width}px`, height: `${props.height}px` }}
    ></div>
  );
};

export default Box;
