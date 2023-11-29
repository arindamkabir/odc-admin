import useProductStore from '@/store/productStore';
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Label from '../common/form/Label';
import Input from '../common/form/Input';
import { StoreCategoryRequest, useStoreCategory } from '@/hooks/mutations/useStoreCategory';
import { Category } from '@/types/Category';
import InputError from '../common/form/InputError';
import CategorySelect from '../products/CategorySelect';
import Toggle from '../common/form/Toggle';
import PrimaryButton from '../common/buttons/PrimaryButton';


const CreateCategoryForm = () => {
    const showingCreateCategoryDrawer = useProductStore(state => state.showingCreateCategoryDrawer);
    const setShowingCreateCategoryDrawer = useProductStore(state => state.setShowingCreateCategoryDrawer);

    const { register, handleSubmit, control, watch, formState: { errors }, setValue, setError } = useForm<StoreCategoryRequest>({
        // defaultValues: {
        //     name: '',
        //     category_id: '',
        //     entry_type: 'boolean'
        // }
    });

    const { mutate, isPending } = useStoreCategory(setError, () => { setShowingCreateCategoryDrawer(false) });

    const storeCategory: SubmitHandler<StoreCategoryRequest> = async (data) => {
        console.log(data);
        mutate(data);
    }

    return (
        <form
            className="w-full flex flex-col h-full justify-between"
            onSubmit={handleSubmit(storeCategory)}
        >
            <div className='space-y-4'>
                <div className='space-y-1'>
                    <Label>Name</Label>
                    <Input
                        type="text"
                        {...register('name', { required: { value: true, message: "Name is required." } })}
                    />
                    {errors.name && <InputError message={errors.name.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Category</Label>
                    <Controller
                        control={control}
                        defaultValue={null}
                        name="parent"
                        // rules={{ required: { value: false, message: "Category is required." } }}
                        render={({ field }) => (
                            <CategorySelect
                                value={field.value}
                                onChange={field.onChange}
                                disabled={field.disabled}
                            />
                        )}
                    />
                    {errors.parent && <InputError message={errors.parent.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Feature Category?</Label>
                    <Controller
                        control={control}
                        defaultValue={false}
                        name="is_featured"
                        // rules={{ required: { value: true, message: "This value is required." } }}
                        render={({ field }) => (
                            <Toggle
                                enabled={field.value}
                                setEnabled={field.onChange}
                            />
                        )}
                    />
                    {errors.is_featured && <InputError message={errors.is_featured.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Hide Category?</Label>
                    <Controller
                        control={control}
                        defaultValue={false}
                        name="is_hidden"
                        // rules={{ required: { value: true, message: "This value is required." } }}
                        render={({ field }) => (
                            <Toggle
                                enabled={field.value}
                                setEnabled={field.onChange}
                            />
                        )}
                    />
                    {errors.is_hidden && <InputError message={errors.is_hidden.message} />}
                </div>

            </div>

            <PrimaryButton
                type="submit"
                isLoading={isPending}
            >
                Save
            </PrimaryButton>
        </form>
    )
}

export default CreateCategoryForm