import { cn } from "../../lib/utitls";

const PrimaryButton = ({ buttonText, className }) => {
  return (
    <button
      className={cn(
        "py-2! px-6! rounded-md text-gray-100 w-full bg-amber-600 transition-all duration-200 ease cursor-pointer hover:opactiy-80",
        className
      )}>
      {buttonText}
    </button>
  );
};

export default PrimaryButton;
