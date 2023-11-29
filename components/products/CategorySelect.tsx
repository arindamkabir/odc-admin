import React, { useState } from 'react';
import { AsyncPaginate, wrapMenuList } from 'react-select-async-paginate';
import { components, ActionMeta, MenuListProps, SingleValue, StylesConfig, GroupBase } from 'react-select';
import { Category } from '@/types/Category';
import axios from '@/lib/axios';
import { CategoryListResponse } from '@/hooks/queries/category/useGetCategoryList';
import clsx from 'clsx';
import PrimaryButton from '../common/buttons/PrimaryButton';
import { PlusIcon } from '@heroicons/react/24/solid';
import useProductStore from '@/store/productStore';

type IProps = {
    value?: SingleValue<Category>,
    onChange: (newValue: SingleValue<Category>, actionMeta: ActionMeta<Category>) => void;
    disabled?: boolean;
    showAddButton?: boolean;
}

const MenuList: (props: MenuListProps<Category, false, GroupBase<Category>>) => React.ReactElement = (props) => {
    const setShowingCreateCategoryDrawer = useProductStore(state => state.setShowingCreateCategoryDrawer);

    return (
        <components.MenuList  {...props}>
            {props.children}
            <button
                type="button"
                className='btn btn-ghost text-sm !py-1 flex text-center !w-full'
                onClick={() => setShowingCreateCategoryDrawer(true)}
            >
                <span><PlusIcon className='h-5 w-5' /></span> Add Category
            </button>
        </components.MenuList >
    )
};

const wrappedMenuList = wrapMenuList<Category, false, GroupBase<Category>>(MenuList);

const CategorySelect = ({ showAddButton = false, ...props }: IProps) => {
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

        const response = await axios.get<CategoryListResponse>(`/api/admin/categories`, { params });

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
            getOptionValue={(option: Category) => option.name}
            getOptionLabel={(option: Category) => option.name}
            onChange={props.onChange}
            isSearchable={true}
            placeholder="Select Category"
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

export default CategorySelect;