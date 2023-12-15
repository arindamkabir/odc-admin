import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';

const FileInput = forwardRef<HTMLInputElement, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { register?: object }>(({ className = "", type = "file", ...props }, ref) => {
    return (
        // <input
        //     ref={ref}
        //     type="file"
        //     className={`"file-input file-input-bordered file-input-primary w-full  ${className}`}
        //     {...props}
        // />

        <label className="w-64 flex flex-col items-center px-4 py-6 bg-primary rounded-lg shadow-lg tracking-wide uppercase cursor-pointer text-black">
            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">{props.multiple ? 'Select Files' : 'Select a file'}</span>
            <input ref={ref} type='file' className="hidden"  {...props} />
        </label>
    )
});

FileInput.displayName = "FileInput";

export default FileInput;