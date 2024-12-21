import { SelectHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export default function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn("border border-gray-300 rounded-md p-2", className)}
      {...props}
    />
  );
}
