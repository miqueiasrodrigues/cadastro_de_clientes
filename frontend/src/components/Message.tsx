import React from "react";
import "./styles/message.css";
import { ResponseType } from "../models/types/ResponseType";

interface MessageProps {
  response: ResponseType;
  height: number;
  width: number;
  changeMessage: (message: string) => void;
}

const Message: React.FC<MessageProps> = (props) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(true);
  const duration = 2000;

  React.useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      props.changeMessage("");
    }, duration);

    return () => clearTimeout(timer);
  }, [props.response]);

  return (
    <React.Fragment>
      {isVisible && props.response.message !== "" && (
        <div
          className="message"
          style={{
            height: `${props.height}%`,
            width: `${props.width}%`,
            backgroundColor:
              props.response.status === "success"
                ? "green"
                : props.response.status === "error"
                ? "red"
                : "yellow",
          }}
        >
          {props.response.message}
        </div>
      )}
    </React.Fragment>
  );
};

export default Message;
