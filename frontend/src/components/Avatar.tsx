import React from "react";
import "./styles/avatar.css";

interface AvatarProps {
  proportion: number;
  imageUrl?: string;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <div
      className="avatar"
      style={{
        height: `${props.proportion}px`,
        width: `${props.proportion}px`,
        backgroundImage: `url('${props.imageUrl}')`,
      }}
    >
    </div>
  );
};

export default Avatar;
