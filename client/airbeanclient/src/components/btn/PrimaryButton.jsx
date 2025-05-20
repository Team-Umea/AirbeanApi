import { cn } from "../../lib/utitls";

const PrimaryButton = ({ children, className }) => {
  return (
    <button
      className={cn(
        "py-2! px-6! flex justify-center items-center gap-x-4 rounded-md text-gray-100 w-full bg-amber-600 transition-all duration-200 ease cursor-pointer hover:opactiy-80",
        className
      )}>
      {children}
    </button>
  );
};

export default PrimaryButton;
