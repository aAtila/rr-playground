import { SelectHTMLAttributes } from "react";

export default function Select({
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className="border border-gray-300 rounded-md p-2" {...props} />
  );
}
