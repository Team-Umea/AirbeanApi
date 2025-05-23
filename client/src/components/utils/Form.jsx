import { useFormContext } from "react-hook-form";
import { cn } from "../../lib/utitls";

const Form = ({ onSubmit, children, className }) => {
  const { handleSubmit } = useFormContext();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("p-12! flex flex-col items-center w-full rounded-md", className)}>
      {children}
    </form>
  );
};

export default Form;
