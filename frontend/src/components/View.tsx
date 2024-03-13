import React from "react";
import "./styles/view.css";

interface ViewProps {
  children?: React.ReactNode;
  width: number;
  height: number;
  overflowY: "visible" | "hidden" | "scroll" | "auto";
  color?: string;
}

const View: React.FC<ViewProps> = (props) => {
  return (
    <div
      className="view"
      style={{
        height: `${props.height}%`,
        width: `${props.width}%`,
        overflowY: props.overflowY,
        backgroundColor: props.color,
      }}
    >
      {props.children}
    </div>
  );
};

export default View;
