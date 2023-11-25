import { DetailedHTMLProps, ReactNode, SelectHTMLAttributes, forwardRef } from 'react';

type ISelectProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
    register?: object,
    children: ReactNode
};

const Select = forwardRef<HTMLSelectElement, ISelectProps>(({ className = "", children, placeholder, ...props }, ref) => {
    return (
        <select
            ref={ref}
            className={`select select-bordered w-full max-w-xs text-sm ${className}`}
            placeholder={placeholder}
            {...props}
        >
            <option disabled selected>{placeholder}</option>
            {children}
        </select>
    )
});

Select.displayName = "Select";

export default Select;
