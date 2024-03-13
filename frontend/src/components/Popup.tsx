import React from "react";
import "./styles/popup.css";
import Header from "./Header";

interface PopupProps {
  text: string;
  children?: React.ReactNode;
  width: number;
  height: number;
  onChange: () => void;
}

const Popup: React.FC<PopupProps> = (props) => {
  return (
    <section
      className="popup"
      style={{
        height: `${props.height}%`,
        width: `${props.width}%`,
      }}
    >
      <Header height={10} width={100} color="var(--black-color)" fontColor="var(--white-color)">
        <span>{props.text}</span>
        <button className="popup-close" onClick={props.onChange}>x</button>
      </Header>
      {props.children}
    </section>
  );
};

export default Popup;
