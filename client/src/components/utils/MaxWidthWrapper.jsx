import { cn } from "../../lib/utitls";

const MaxWidthWrapper = ({
  classNameWrapper,
  classNameContainer,
  children,
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full px-2.5 md:px-20 flex flex-col items-center",
        classNameWrapper
      )}
    >
      <div className={cn("w-full max-w-screen-xl", classNameContainer)}>
        {children}
      </div>
    </div>
  );
};

export default MaxWidthWrapper;
