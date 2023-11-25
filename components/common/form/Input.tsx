import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { register?: object }>(({ className = "", type = "text", ...props }, ref) => {
    return (
        <input
            ref={ref}
            type={type}
            className={`input input-bordered text-sm w-full ${className}`}
            {...props}
        />
    )
});

Input.displayName = "Input";

export default Input;