import { DetailedHTMLProps, TextareaHTMLAttributes, forwardRef } from 'react';

const TextArea = forwardRef<HTMLTextAreaElement, DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & { register?: object }>(({ className = "", ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            className={`textarea textarea-bordered text-sm w-full ${className}`}
            {...props}
        />
    )
});

TextArea.displayName = "TextArea";

export default TextArea;