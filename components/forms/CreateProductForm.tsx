import React from 'react'
import Label from '../common/form/Label';
import Input from '../common/form/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StoreProductRequest } from '@/hooks/mutations/useStoreProduct';
import InputError from '../common/form/InputError';
import SearchableSelect from '../common/form/SearchableSelect';
import PrimaryButton from '../common/buttons/PrimaryButton';
import { PlusIcon } from '@heroicons/react/24/solid';
import useProductStore from '@/store/productStore';

const CreateProductForm = () => {
    const showingCreateCategoryDrawer = useProductStore(state => state.showingCreateCategoryDrawer);
    const setShowingCreateCategoryDrawer = useProductStore(state => state.setShowingCreateCategoryDrawer);

    const { register, handleSubmit, watch, formState: { errors }, setValue, setError } = useForm<StoreProductRequest>({
        // defaultValues: {
        //     name: '',
        //     category_id: '',
        //     entry_type: 'boolean'
        // }
    });

    const storeProduct: SubmitHandler<StoreProductRequest> = async (data) => {
        console.log(data);
        // mutate(data);
    }

    return (
        <form
            className="w-full flex flex-col h-full justify-between"
            onSubmit={handleSubmit(storeProduct)}
        >
            <div className='space-y-4'>
                <div className='space-y-1'>
                    <Label>Name</Label>
                    <Input
                        type="name"
                        {...register('name', { required: { value: true, message: "Name is required." } })}
                    />
                    {errors.name && <InputError message={errors.name.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Category</Label>
                    <SearchableSelect
                        placeholder='Select Category'
                        options={categoryOptions}
                        handleChange={(item) => setValue("category_id", item?.value ?? '')}
                        footer={
                            <button
                                type='button'
                                onClick={() => { setShowingCreateCategoryDrawer(true); }}
                                className='w-full flex items-center justify-center space-x-1 py-2 hover:bg-primary mb-2 rounded-md'>
                                <PlusIcon className='h-4 w-4' />
                                <span>Add Category</span>
                            </button>
                        }
                    />
                    {errors.category_id && <InputError message={errors.category_id.message} />}
                </div>


            </div>

            <PrimaryButton type="submit" isLoading={isCreating}>
                Save
            </PrimaryButton>
        </form>
    )
}

export default CreateProductForm