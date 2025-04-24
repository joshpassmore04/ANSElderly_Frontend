import React from 'react';
import { useNavigate } from 'react-router';

interface PopupActionButtonProps {
  text: string;
  route?: string;
  bgColor?: string;  // Optional prop, default value will be set inside the component
  bgHover?: string;  // Optional prop, default value will be set inside the component
  callback?: () => void; // Optional callback function
}

export const PopupActionButton: React.FC<PopupActionButtonProps> = ({
  text,
  route,
  bgColor = "bg-blue-500", // Default value for bgColor
  bgHover = "bg-blue-600", // Default value for bgHover
  callback,
}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    } else if (callback) {
      callback();
    }
  };

  return (
    <button
      className={`${bgColor} text-white py-2 rounded-md px-6 transition-transform duration-150 text-xl hover:${bgHover} active:scale-105 ease-out shadow-lg`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
