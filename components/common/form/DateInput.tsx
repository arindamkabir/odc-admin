import { format } from 'date-fns';
import { DayPicker, useInput } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from '@chakra-ui/react';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

type DateInputProps = {
    value: Date | undefined,
    handleChange: (date: Date | undefined) => void
}

export default function DateInput({ value, handleChange }: DateInputProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { inputProps, dayPickerProps: { selected, onDayClick, ...pickerProps } } = useInput({
        fromYear: 2021,
        toYear: 2023,
        format: 'PP',
        required: true,
    });

    return (
        <Popover
            placement='bottom'
            closeOnEsc
            closeOnBlur
            isOpen={isOpen}
            onClose={() => setIsOpen(true)}
            onOpen={() => setIsOpen(true)}
        >
            <PopoverTrigger>
                <div className="relative rounded-md shadow-sm bg-base-700">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <CalendarDaysIcon className='text-white h-5 w-5' />
                    </div>
                    <input
                        type='text'
                        className="block bg-base-700 w-full rounded-md py-3 pr-4 pl-10 ring-0 outline-none border border-base-400 focus:border-primary-500 sm:text-sm sm:leading-6"
                        {...inputProps}
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className='bg-base-700 !border-base-600'>
                <PopoverArrow className='bg-base-700' />
                <PopoverBody className='bg-base-700'>
                    <DayPicker
                        selected={value}
                        onDayClick={(day, activeModifiers, e) => {
                            handleChange(day);
                            if (onDayClick)
                                onDayClick(day, activeModifiers, e);
                            setIsOpen(false);
                        }}
                        modifiersClassNames={{
                            selected: '!bg-primary-500',
                            outside: '!bg-primary-700'
                            // // today: 'my-today'
                        }}
                        {...pickerProps}
                    />
                </PopoverBody>
            </PopoverContent>
        </Popover>

    );
}