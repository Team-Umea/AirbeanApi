import { cn } from "../../lib/utitls";

const Badge = ({ children, className }) => {
  return <div className={cn("px-2 py-1 rounded-sm font-semibold", className)}>{children}</div>;
};

export default Badge;
