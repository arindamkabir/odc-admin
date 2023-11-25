type IInputErrorProps = {
    message?: string,
    className?: string;
};

export default function InputError({ message, className = '' }: IInputErrorProps) {
    return <>{message && <p className={`text-xs text-error ${className}`}>{message}</p>}</>;
}
