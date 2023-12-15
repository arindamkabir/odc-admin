import React from 'react'
import Label from '../../common/form/Label';
import Input from '../../common/form/Input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { StoreProductRequest, useStoreProduct } from '@/hooks/mutations/product/useStoreProduct';
import InputError from '../../common/form/InputError';
import SearchableSelect from '../../common/form/SearchableSelect';
import PrimaryButton from '../../common/buttons/PrimaryButton';
import { PlusIcon } from '@heroicons/react/24/solid';
import useStore from '@/store/store';
import CategorySelect from '../../products/CategorySelect';
import { Category } from '@/types/Category';
import TextArea from '../../common/form/TextArea';
import Toggle from '../../common/form/Toggle';
import FileInput from '../../common/form/FileInput';


const CreateProductForm = () => {
    const showingCreateCategoryDrawer = useStore(state => state.showingCreateCategoryDrawer);
    const setShowingCreateCategoryDrawer = useStore(state => state.setShowingCreateCategoryDrawer);
    const showCreateProductDrawer = useStore(state => state.showCreateProductDrawer);

    const { register, handleSubmit, control, watch, formState: { errors }, setValue, setError } = useForm<StoreProductRequest>({
        // defaultValues: {
        //     name: '',
        //     category_id: '',
        //     entry_type: 'boolean'
        // }
    });

    const { mutate, isPending } = useStoreProduct(setError, () => { showCreateProductDrawer(false) });

    const storeProduct: SubmitHandler<StoreProductRequest> = async (data) => {
        console.log(data);
        mutate(data);
    }

    return (
        <form
            className="w-full flex flex-col h-full justify-between"
            onSubmit={handleSubmit(storeProduct)}
        >
            <div className='space-y-4 mb-6'>
                <div className='space-y-1'>
                    <Label>Name</Label>
                    <Input
                        type="text"
                        {...register('name', { required: { value: true, message: "Name is required." } })}
                    />
                    {errors.name && <InputError message={errors.name.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>SKU</Label>
                    <Input
                        type="text"
                        {...register('SKU', { required: { value: true, message: "SKU is required." } })}
                    />
                    {errors.SKU && <InputError message={errors.SKU.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Price</Label>
                    <Input
                        type="text"
                        {...register('price', { required: { value: true, message: "Price is required." } })}
                    />
                    {errors.price && <InputError message={errors.price.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Category</Label>
                    <Controller
                        control={control}
                        defaultValue={null}
                        name="category"
                        rules={{ required: { value: true, message: "Category is required." } }}
                        render={({ field }) => (
                            <CategorySelect
                                value={field.value}
                                onChange={field.onChange}
                                disabled={field.disabled}
                                showAddButton={true}
                            />
                        )}
                    />
                    {errors.category && <InputError message={errors.category.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Description</Label>
                    <TextArea
                        rows={5}
                        {...register('description', { required: { value: true, message: "Description is required." } })}
                    />
                    {errors.description && <InputError message={errors.description.message} />}
                </div>

                {/* Images */}
                <div className='space-y-1'>
                    <Label>Primary Image</Label>
                    <FileInput {...register('primary_img', { required: { value: true, message: "Description is required." } })} />
                </div>

                <div className='space-y-1'>
                    <Label>Feature Product?</Label>
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
                    <Label>Hide Product?</Label>
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

                <div className='space-y-1'>
                    <Label>Has Colors?</Label>
                    <Controller
                        control={control}
                        defaultValue={false}
                        name="has_colors"
                        // rules={{ required: { value: true, message: "This value is required." } }}
                        render={({ field }) => (
                            <Toggle
                                enabled={field.value}
                                setEnabled={field.onChange}
                            />
                        )}
                    />
                    {errors.has_colors && <InputError message={errors.has_colors.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Has Sizes</Label>
                    <Controller
                        control={control}
                        defaultValue={false}
                        name="has_sizes"
                        // rules={{ required: { value: true, message: "This value is required." } }}
                        render={({ field }) => (
                            <Toggle
                                enabled={field.value}
                                setEnabled={field.onChange}
                            />
                        )}
                    />
                    {errors.has_sizes && <InputError message={errors.has_sizes.message} />}
                </div>

            </div>

            <PrimaryButton type="submit" isLoading={isPending}>
                Save
            </PrimaryButton>
        </form>
    )
}

export default CreateProductForm