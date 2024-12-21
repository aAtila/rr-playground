import { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export default function Button({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "bg-yellow-500 px-4 py-2 rounded-md cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
