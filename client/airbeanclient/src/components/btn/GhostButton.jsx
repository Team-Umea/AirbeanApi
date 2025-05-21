import { cn } from "../../lib/utitls";

const GhostButton = ({ onClick, type = "button", children, className, props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      {...props}
      className={cn(
        "py-2! px-6! flex justify-center items-center gap-x-4 rounded-md text-gray-100 w-full bg-gray-300 transition-all duration-200 ease cursor-pointer hover:opacity-80",
        className
      )}>
      {children}
    </button>
  );
};

export default GhostButton;
