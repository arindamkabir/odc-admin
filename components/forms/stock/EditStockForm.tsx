import useStore from '@/store/store';
import React, { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Label from '../../common/form/Label';
import Input from '../../common/form/Input';
import InputError from '../../common/form/InputError';
import PrimaryButton from '../../common/buttons/PrimaryButton';
import ColorSelect from '../../products/ColorSelect';
import SizeSelect from '../../products/SizeSelect';
import { UpdateStockRequest, useUpdateStock } from '@/hooks/mutations/stocks/useUpdateStock';

type UpdateStockFormInputs = Omit<UpdateStockRequest, 'id'>;

const CreateStockForm = () => {
    const showEditStockDrawer = useStore(state => state.showEditStockDrawer);
    const setEditingStock = useStore(state => state.setEditingStock);
    const editingStock = useStore(state => state.editingStock);

    const { mutate, isPending } = useUpdateStock(() => { showEditStockDrawer(false) });

    const { register, handleSubmit, formState: { errors }, control, setError, reset } = useForm<UpdateStockFormInputs>({
        defaultValues: {
            color: editingStock?.color ?? null,
            size: editingStock?.size ?? null,
            quantity: editingStock?.quantity ?? 0,
            price: Number(editingStock?.price ?? 0),
            sales_price: Number(editingStock?.sales_price ?? 0)
        }
    });

    useEffect(() => {
        if (!editingStock) return;
        reset()
    }, [editingStock, reset]);

    const updateStock: SubmitHandler<UpdateStockFormInputs> = async (data) => {
        if (!editingStock) return;
        mutate({
            id: editingStock.id,
            ...data
        });
    }

    return (
        <form
            className="w-full flex flex-col h-full justify-between"
            onSubmit={handleSubmit(updateStock)}
        >
            <div className='space-y-4'>
                <div className='space-y-1'>
                    <Label>Color</Label>
                    <Controller
                        control={control}
                        defaultValue={null}
                        name="color"
                        rules={{ required: { value: false, message: "Color is required." } }}
                        render={({ field }) => (
                            <ColorSelect
                                value={field.value}
                                onChange={field.onChange}
                                disabled={field.disabled}
                                showAddButton={true}
                            />
                        )}
                    />
                    {errors.color && <InputError message={errors.color.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Size</Label>
                    <Controller
                        control={control}
                        defaultValue={null}
                        name="size"
                        rules={{ required: { value: false, message: "Size is required." } }}
                        render={({ field }) => (
                            <SizeSelect
                                value={field.value}
                                onChange={field.onChange}
                                disabled={field.disabled}
                                showAddButton={true}
                            />
                        )}
                    />
                    {errors.size && <InputError message={errors.size.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Quantity</Label>
                    <Input
                        type="number"
                        {...register('quantity', { required: { value: true, message: "Quantity is required.", }, valueAsNumber: true })}
                    />
                    {errors.quantity && <InputError message={errors.quantity.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Price</Label>
                    <Input
                        type="number"
                        {...register('price', { required: { value: true, message: "Price is required.", }, valueAsNumber: true })}
                    />
                    {errors.price && <InputError message={errors.price.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Sales Price</Label>
                    <Input
                        type="number"
                        {...register('sales_price', { required: false, valueAsNumber: true })}
                    />
                    {errors.sales_price && <InputError message={errors.sales_price.message} />}
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
};

export default CreateStockForm;