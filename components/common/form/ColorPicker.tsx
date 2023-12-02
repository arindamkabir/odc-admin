import React, { useState } from 'react'
import { ChromePicker, ChromePickerProps, ColorChangeHandler } from 'react-color';

type IColorPickerProps = ChromePickerProps

const ColorPicker = ({ color, ...props }: IColorPickerProps) => {
    const [show, setShow] = useState<boolean>(false);

    const handleClick = () => {
        setShow(val => !val);
    };

    const handleClose = () => {
        setShow(false);
    };

    return (
        <div>
            <button type="button" onClick={handleClick}>
                <div className="w-10 h-10 rounded-md" style={{ backgroundColor: color === undefined ? '#000000' : color.toString() }}></div>
            </button>
            {show ?
                <div style={{
                    position: 'absolute',
                    zIndex: '2',
                }}>
                    <div style={{
                        position: 'fixed',
                        top: '0px',
                        right: '0px',
                        bottom: '0px',
                        left: '0px',
                    }}
                        onClick={handleClose} />
                    <ChromePicker
                        color={color}
                        {...props}
                    />
                </div>
                : null
            }
        </div>
    )
}

export default ColorPicker;