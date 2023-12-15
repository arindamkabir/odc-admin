import useStore from '@/store/store';
import React, { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Label from '../../common/form/Label';
import Input from '../../common/form/Input';
import { StoreCategoryRequest, useStoreCategory } from '@/hooks/mutations/category/useStoreCategory';
import { Category } from '@/types/Category';
import InputError from '../../common/form/InputError';
import CategorySelect from '../../products/CategorySelect';
import Toggle from '../../common/form/Toggle';
import PrimaryButton from '../../common/buttons/PrimaryButton';
import { UpdateCategoryRequest, useUpdateCategory } from '@/hooks/mutations/category/useUpdateCategory';

type UpdateCategoryFormState = Omit<UpdateCategoryRequest, 'id'>;

const EditCategoryForm = () => {
    const editingCategory = useStore(state => state.editingCategory);
    const showingEditCategoryDrawer = useStore(state => state.showingEditCategoryDrawer);
    const setShowingEditCategoryDrawer = useStore(state => state.setShowingEditCategoryDrawer);

    const { register, handleSubmit, control, watch, formState: { errors }, reset, setError } = useForm<UpdateCategoryFormState>({
        defaultValues: {
            name: editingCategory?.name ?? '',
            parent: editingCategory?.parent ?? null,
            is_featured: editingCategory?.is_featured ? true : false ?? '',
            is_hidden: editingCategory?.is_hidden ? true : false ?? ''
        }
    });

    useEffect(() => {
        if (!editingCategory) return;
        reset()
    }, [editingCategory, reset]);

    const { mutate, isPending } = useUpdateCategory(setError, () => { setShowingEditCategoryDrawer(false) });

    const updateCategory: SubmitHandler<UpdateCategoryFormState> = async (data) => {
        if (!editingCategory) return;
        mutate({
            id: editingCategory.id,
            ...data
        });
    }

    return (
        <form
            className="w-full flex flex-col h-full justify-between"
            onSubmit={handleSubmit(updateCategory)}
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

export default EditCategoryForm