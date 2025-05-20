import { useFormContext } from "react-hook-form";
import { cn } from "../../lib/utitls";

const FormInput = ({
  name,
  label,
  type = "text",
  placeholder = "",
  classNameLabel,
  classNameInput,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {label && (
        <label htmlFor={name} className={cn("font-medium text-lg", classNameLabel)}>
          {label}
        </label>
      )}
      <input
        {...register(name)}
        type={type}
        id={name}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck="false"
        autoCorrect="false"
        className={cn(
          "py-1! px-2! border-2 rounded-sm transition-all duration-300",
          {
            "border-red-600": error,
            "border-gray-300": !error, // Default border color
          },
          classNameInput
        )}
      />
      {error && <span className="text-red-600 text-sm font-semibold">{error}</span>}
    </div>
  );
};

export default FormInput;
