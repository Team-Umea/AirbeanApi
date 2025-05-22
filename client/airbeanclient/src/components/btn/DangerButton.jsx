import { cn } from "../../lib/utitls";

const DangerButton = ({ type = "button", onClick, children, className, props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      {...props}
      className={cn(
        "py-2! px-6! flex justify-center items-center gap-x-4 rounded-md text-gray-100 w-full bg-red-600 transition-all duration-200 ease cursor-pointer hover:opacity-80",
        className
      )}>
      {children}
    </button>
  );
};

export default DangerButton;
