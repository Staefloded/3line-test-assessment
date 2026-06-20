import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, type, ...props }, ref) => {
    const inputElement = (
      <input
        type={type}
        ref={ref}
        className={cn(
          "text-sm outline-none bg-transparent placeholder:text-gray-400",
          icon
            ? "flex-1 text-gray-700"
            : cn(
                "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 bg-white",
                "focus:border-violet-500 focus:ring-2 focus:ring-violet-100",
                "disabled:cursor-not-allowed disabled:opacity-50 transition-all",
                className
              )
        )}
        {...props}
      />
    );

    if (!icon) return inputElement;

    return (
      <div
        className={cn(
          "flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 bg-white",
          "focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100",
          "transition-colors",
          className
        )}
      >
        <span className="shrink-0 text-gray-400">{icon}</span>
        {inputElement}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
