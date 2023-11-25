import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

const CurrencyInput = ({ className = "", onChange, type = "number", ...props }: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    return (
        <div className="relative rounded-md shadow-sm bg-base-700">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="sm:text-sm">৳</span>
            </div>
            <input
                type='number'
                className="block bg-base-700 w-full rounded-md py-3 pr-4 pl-7 ring-0 outline-none border border-base-400 focus:border-primary-500 sm:text-sm sm:leading-6"
                {...props} />
        </div>
    )
}

export default CurrencyInput