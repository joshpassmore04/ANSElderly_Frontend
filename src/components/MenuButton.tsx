import { IconType } from "react-icons";
import { useNavigate } from "react-router";

interface MenuButtonProps {
  text: string;
  route?: string;
  bgColor?: string;
  bgHover?: string;
  flex?: string;
  icon: IconType;
  callback?: () => void;
  type?: "button" | "submit" | "reset";
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  text,
  route,
  bgColor = "bg-blue-500",
  bgHover = "bg-blue-600",
  callback,
  icon,
  flex = "col",
  type = "button",
}) => {
  const navigate = useNavigate();
  const Icon = icon; // <-- Capitalize it so JSX treats it as a component

  const handleClick = () => {
    setTimeout(() => {
      if (route) {
        navigate(route);
      } else if (callback) {
        callback();
      }
    }, 150);
  };

  return (
    <button
      type={type}
      className={`${bgColor} text-white w-full h-full flex flex-${flex} items-center p-3 justify-center text-nowrap rounded-md md:px-5 lg:px-6 transition-transform duration-150 md:text-sm lg:text-2xl hover:${bgHover} active:scale-102 ease-out shadow-lg`}
      onClick={handleClick}
    >
      <Icon className="text-3xl m-1" /> {/* Render the icon */}
      {text}
    </button>
  );
};
