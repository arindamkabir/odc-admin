import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import React from 'react'

type SearchInputProps = {
    value: string,
    onChange: (value: string) => void
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
    return (
        <div className="join">
            <div>
                <div>
                    <input
                        className="input input-bordered join-item min-w-[20rem]"
                        placeholder="Search"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </div>
            </div>
            <div className="">
                <button className="btn join-item"><MagnifyingGlassIcon className='h-5 w-5' /></button>
            </div>
        </div>
    )
}

export default SearchInput;