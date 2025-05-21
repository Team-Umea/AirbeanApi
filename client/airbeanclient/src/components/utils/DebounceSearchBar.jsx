import { useState, useEffect } from "react";
import { cn } from "../../lib/utitls";

const DebounceSearchBar = ({
  onSearch,
  setIsLoading,
  placeholder = "Sök...",
  classNameContainer,
  className,
}) => {
  const [input, setInput] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    setIsLoading(true);

    const handler = setTimeout(() => {
      setDebouncedValue(input);
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className={cn("w-full", classNameContainer)}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full px-4 py-2 border-b border-gray-300 bg-gray-100 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all",
          className
        )}
      />
    </div>
  );
};

export default DebounceSearchBar;
