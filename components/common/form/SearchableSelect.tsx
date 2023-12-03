import React, { ComponentType } from 'react'
import ReactSelect, { MenuListProps, SingleValue } from 'react-select';
import clsx from "clsx";
import { components, ControlProps, GroupBase, Props } from "react-select";
import type { } from 'react-select/base';
import { MenuListComponentProps } from './menu';

declare module 'react-select/base' {
    export interface Props<
        Option,
        IsMulti extends boolean,
        Group extends GroupBase<Option>
    > {
        footer?: React.ReactNode
    }
}

type Option = {
    value: string,
    label: string
}

type SelectProps = {
    options: Option[];
    handleChange: (value: Option | null) => void;
    placeholder?: string;
    footer?: React.ReactNode;
}

const MenuList = ({ selectProps, ...props }: MenuListComponentProps<Option>) => {
    return (
        <components.MenuList  {...props}>
            {props.children}
            {selectProps.footer ?
                selectProps.footer
                : null
            }
        </components.MenuList >
    )
}

const SearchableSelect = ({ options, handleChange, placeholder = "Select", footer }: SelectProps) => {
    return (
        <ReactSelect
            footer={footer}
            options={options}
            onChange={(value: Option | null) => handleChange(value)}
            placeholder={placeholder}
            unstyled
            classNames={{
                input: () => "no-underline outline-none",
                control: (state) => clsx("px-4 py-3 border shadow-md border-neutral rounded-md text-sm", (state.isFocused || state.menuIsOpen) && "border-primary"),
                menu: (state) => clsx("bg-base-300 py-1 text-sm"),
                option: (state) =>
                    clsx(
                        "px-3 py-2 hover:cursor-pointer hover:bg-primary rounded-md",
                        state.isFocused && "",
                        state.isSelected && "bg-primary hover:bg-primary"
                    ),
            }}
            components={{ MenuList }}
        />
    )
};

export default SearchableSelect;