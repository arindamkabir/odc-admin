import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import FileInput from '@/components/common/form/FileInput';
import Input from '@/components/common/form/Input';
import InputError from '@/components/common/form/InputError';
import Label from '@/components/common/form/Label';
import TextArea from '@/components/common/form/TextArea';
import Toggle from '@/components/common/form/Toggle';
import CategorySelect from '@/components/products/CategorySelect';
import { UpdateProductRequest, useUpdateProduct } from '@/hooks/mutations/product/useUpdateProduct';
import useStore from '@/store/store';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type UpdateProductFormInputs = Omit<UpdateProductRequest, 'id'>;

const EditProductForm = () => {
    const router = useRouter();
    const editingProduct = useStore(state => state.editingProduct);
    const showEditProductDrawer = useStore(state => state.showEditProductDrawer);

    const { register, handleSubmit, control, watch, formState: { errors }, setValue, reset, setError } = useForm<UpdateProductFormInputs>({
        defaultValues: {
            name: editingProduct?.name ?? '',
            category: editingProduct?.category ?? null,
            price: editingProduct?.price ?? '0',
            description: editingProduct?.description ?? '',
            SKU: editingProduct?.SKU ?? '',
            is_featured: editingProduct?.is_featured ?? false,
            is_hidden: editingProduct?.is_hidden ?? false,
            has_colors: editingProduct?.has_colors ?? false,
            has_sizes: editingProduct?.has_sizes ?? false,
        }
    });

    useEffect(() => {
        if (!editingProduct) return;
        reset()
    }, [editingProduct, reset]);

    const { mutate, isPending } = useUpdateProduct(setError, () => { showEditProductDrawer(false); router.replace(router.asPath); });

    const updateProduct: SubmitHandler<UpdateProductFormInputs> = async (data) => {
        if (!editingProduct) return;
        mutate({
            id: editingProduct.id,
            ...data
        });
    }

    return (
        <form
            className="w-full flex flex-col h-full justify-between"
            onSubmit={handleSubmit(updateProduct)}
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

export default EditProductForm