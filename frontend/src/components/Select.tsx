import React from "react";
import "./styles/select.css";

interface SelectProps {
  text: string;
  options: string[];
  headers: string[];
  onChange: (selectedOptions: string[]) => void;
}

const Select: React.FC<SelectProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
    props.onChange(updatedOptions);
  };

  return (
    <div className="select">
      <div className="select-header" onClick={toggleDropdown}>
        <span className="btn">{props.text}</span>
      </div>
      {isOpen && (
        <div className="select-options">
          {props.options.map((option, index) => (
            <div key={index} onClick={() => handleOptionClick(option)}>
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                value={option}
                checked={selectedOptions.includes(option)}
                readOnly
              />
              <label htmlFor={`checkbox-${index}`}>{props.headers[index]}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
