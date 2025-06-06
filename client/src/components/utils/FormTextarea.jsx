import { useFormContext } from "react-hook-form";
import { cn } from "../../lib/utitls";

const FormTextarea = ({
  name,
  label,
  placeholder = "",
  className,
  classNameLabel,
  classNameTextarea,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className={cn("flex flex-col gap-y-2 w-full", className)}>
      {label && (
        <label htmlFor={name} className={cn("font-medium text-lg", classNameLabel)}>
          {label}
        </label>
      )}
      <textarea
        {...register(name)}
        id={name}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck="false"
        autoCorrect="false"
        className={cn(
          "py-1! px-2! border-2 rounded-sm transition-all duration-300 h-[100px] resize-none",
          {
            "border-red-600": error,
            "border-gray-300": !error,
          },
          classNameTextarea
        )}
      />
      {error && <span className="text-red-600 text-sm font-semibold">{error}</span>}
    </div>
  );
};

export default FormTextarea;
