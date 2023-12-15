import React, { useState } from 'react';
import { AsyncPaginate, wrapMenuList } from 'react-select-async-paginate';
import { components, ActionMeta, MenuListProps, SingleValue, StylesConfig, GroupBase } from 'react-select';
import axios from '@/lib/axios';
import clsx from 'clsx';
import PrimaryButton from '../common/buttons/PrimaryButton';
import { PlusIcon } from '@heroicons/react/24/solid';
import useStore from '@/store/store';
import { Color } from '@/types/Color';
import { ColorListResponse } from '@/hooks/queries/color/useGetColorLists';

type IProps = {
    value?: SingleValue<Color>,
    onChange: (newValue: SingleValue<Color>, actionMeta: ActionMeta<Color>) => void;
    disabled?: boolean;
    showAddButton?: boolean;
}

const MenuList: (props: MenuListProps<Color, false, GroupBase<Color>>) => React.ReactElement = (props) => {
    const showCreateColorDrawer = useStore(state => state.showCreateColorDrawer);

    return (
        <components.MenuList  {...props}>
            {props.children}
            <button
                type="button"
                className='btn btn-ghost text-sm !py-1 flex text-center !w-full'
                onClick={() => showCreateColorDrawer(true)}
            >
                <span><PlusIcon className='h-5 w-5' /></span> Add Color
            </button>
        </components.MenuList >
    )
};

const wrappedMenuList = wrapMenuList<Color, false, GroupBase<Color>>(MenuList);

const ColorSelect = ({ showAddButton = false, ...props }: IProps) => {
    const [cacheUniq, setCacheUniq] = useState<number>(0);

    const sleep = (ms: number) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(undefined);
            }, ms);
        });

    const loadOptions = async (
        searchQuery: string,
        loadedOptions: any,
        { page }: any
    ) => {
        await sleep(300);

        const params = {
            page: page,
            search: searchQuery,
        }

        const response = await axios.get<ColorListResponse>(`/api/admin/colors`, { params });

        return {
            options: response.data.data,
            hasMore: response.data.current_page < response.data.last_page,
            additional: {
                page: page + 1,
            },
        };
    };


    return (
        <AsyncPaginate
            debounceTimeout={300}
            value={props.value}
            loadOptions={loadOptions}
            getOptionValue={(option: Color) => option.name}
            getOptionLabel={(option: Color) => option.name}
            onChange={props.onChange}
            isSearchable={true}
            placeholder="Select Color"
            additional={{ page: 1 }}
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
            cacheUniqs={[cacheUniq]}
            onInputChange={() => setCacheUniq((val) => val + 1)}
            isDisabled={props.disabled}
            isMulti={false}
            components={showAddButton ? { MenuList: wrappedMenuList } : {}}
        />
    );
};

export default ColorSelect;