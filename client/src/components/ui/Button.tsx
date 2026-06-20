import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "ghost" | "link";
  size?: "default" | "sm" | "xs" | "icon";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button({
  children,
  variant = "default",
  size = "default",
  className,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const variants = {
    default: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    primary: "bg-violet-600 text-white hover:bg-violet-700",
    ghost: "text-gray-600 hover:bg-gray-100",
    link: "text-violet-600 hover:underline p-0",
  };
  const sizes = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1.5 text-xs",
    xs: "px-2 py-1 text-xs",
    icon: "p-2",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg font-medium transition-colors cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  );
}
