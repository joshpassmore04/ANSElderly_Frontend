import { useNavigate } from "react-router";


interface PopupActionButtonProps {
  text: string; // Text to display on the button
  route?: string; // Optional route to navigate to when clicked
  bgColor?: string; // Optional background color (default is bg-blue-500)
  bgHover?: string; // Optional hover background color (default is bg-blue-600)
  callback?: () => void; // Optional callback function to execute on click
  type?: "button" | "submit" | "reset"; // Optional type for the button (default is "button")
}

export const PopupActionButton: React.FC<PopupActionButtonProps> = ({
  text,
  route,
  bgColor = "bg-blue-500", // Default value for bgColor
  bgHover = "bg-blue-600", // Default value for bgHover
  callback,
  type = "button", // Default to "button"
}) => {
  
  const navigate = useNavigate();

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
      type={type} // Set the button type (can be "button", "submit", or "reset")
      className={`${bgColor} text-white lg:min-w-32 min-w-16 py-2 justify-center align-middle text-nowrap rounded-md md:px-5 lg:px-6 transition-transform duration-150 md:text-sm lg:text-2xl hover:${bgHover} active:scale-125 ease-out shadow-lg`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
