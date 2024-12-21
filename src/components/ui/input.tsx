import { InputHTMLAttributes } from "react";

export default function Input({
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="border border-gray-300 rounded-md p-2" {...props} />;
}
