import React from "react";
import { ButtonProps } from "@/types/props/Button";

const Button = ({ type = "button", className = "", children, ...props }: ButtonProps) => (
    <button
        type={type}
        className={`inline-flex items-center px-4 py-2 border-2 border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
        {...props}
    >
        {children}
    </button>
)

export default Button;