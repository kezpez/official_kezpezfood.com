import React from "react";
import './ButtonStyle.css';

export const Button = ({ className, text, onClick }) => {
  return (
      <button className={className} onClick={onClick}>
          {text}
      </button>
  );
};
