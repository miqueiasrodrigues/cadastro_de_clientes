import React from "react";
import "./styles/input.css";
import { InputType } from "../models/types/InputType";
import { handleFileChange } from "../utils/functions/handleFileChange";

interface InputProps {
  inputRef?: React.RefObject<HTMLInputElement>;
  label?: string;
  value?: number | string;
  type: InputType;
  readOnly: boolean;
  placeholder?: string;
  valueChange?: (value: any) => void;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <React.Fragment>
      {props.label && (
        <label className="label" htmlFor={props.label.toLowerCase()}>
          {props.label}
        </label>
      )}
      <input
        placeholder={props.placeholder}
        ref={props.inputRef}
        id={props.label?.toLowerCase()}
        className="input"
        type={props.type}
        value={props.value}
        readOnly={props.readOnly}
        onChange={(e) => {
          if (props.type === "file") {
            props.valueChange?.(handleFileChange(e));
            return;
          }
          props.valueChange?.(e.target.value);
        }}
      />
    </React.Fragment>
  );
};

export default Input;
