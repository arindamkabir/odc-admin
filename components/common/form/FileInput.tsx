import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';

const FileInput = forwardRef<HTMLInputElement, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { register?: object }>(({ className = "", type = "file", ...props }, ref) => {
    return (
        <input
            ref={ref}
            type="file"
            className={`"file-input file-input-bordered file-input-info text-sm w-full ${className}`}
            {...props}
        />
    )
});

FileInput.displayName = "FileInput";

export default FileInput;