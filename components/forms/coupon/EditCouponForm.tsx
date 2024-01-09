import { UpdateCouponRequest, useUpdateCoupon } from '@/hooks/mutations/coupons/useUpdateCoupon';
import useStore from '@/store/store';
import React from 'react'
import { useForm } from 'react-hook-form';
import Label from '../../common/form/Label';
import Input from '../../common/form/Input';
import InputError from '../../common/form/InputError';
import Select from '../../common/form/Select';
import Toggle from '../../common/form/Toggle';
import PrimaryButton from '../../common/buttons/PrimaryButton';
import { Controller } from 'react-hook-form';
import { Coupon } from '@/types/Coupon';
type EditCouponFormState = Omit<UpdateCouponRequest, 'id'>;

const EditCouponForm = () => {
    const showEditCouponDrawer = useStore(state => state.showEditCouponDrawer);
    const editingCoupon = useStore(state => state.editingCoupon);

    const { register, handleSubmit, control, watch, formState: { errors }, setValue, setError } = useForm<EditCouponFormState>({
        defaultValues: {
            value: Number(editingCoupon?.value ?? 0),
            min_cart_value: Number(editingCoupon?.min_cart_value ?? 0),
            max_value: Number(editingCoupon?.max_value ?? 0),
            redemptions: Number(editingCoupon?.redemptions ?? 0),
            expiry_date: editingCoupon?.expiry_date ?? '',
            value_type: editingCoupon?.value_type ?? 'fixed',
            is_disabled: editingCoupon?.is_disabled === 1 ? true : false
        }
    });

    const { mutate, isPending } = useUpdateCoupon(setError, () => { showEditCouponDrawer(false) });

    const updateCoupon = async (data: EditCouponFormState) => {
        if (!editingCoupon) return;
        mutate({
            id: editingCoupon.id,
            ...data
        });
    }

    return (
        <form className="w-full flex flex-col h-full justify-between" onSubmit={handleSubmit(updateCoupon)}>
            <div className='space-y-4'>
                <div className='space-y-1'>
                    <Label>Value</Label>
                    <Input
                        type="number"
                        {...register('value', { required: { value: true, message: "value is required." } })}
                    />
                    {errors.value && <InputError message={errors.value.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Minimum Cart Value</Label>
                    <Input
                        type="number"
                        {...register('min_cart_value', { required: { value: true, message: "Minimum cart value is required." } })}
                    />
                    {errors.min_cart_value && <InputError message={errors.min_cart_value.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Max Value</Label>
                    <Input
                        type="number"
                        {...register('max_value', { required: { value: true, message: "Max value is required." } })}
                    />
                    {errors.max_value && <InputError message={errors.max_value.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Allowed Redemptions</Label>
                    <Input
                        type="number"
                        {...register('redemptions', { required: { value: true, message: "Redemptions is required." } })}
                    />
                    {errors.redemptions && <InputError message={errors.redemptions.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Expiry Date</Label>
                    <Input
                        type="date"
                        {...register('expiry_date', { required: { value: true, message: "Expiry date is required." } })}
                    />
                    {errors.expiry_date && <InputError message={errors.expiry_date.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Value Type</Label>
                    <Controller
                        control={
                            control
                        }
                        name="value_type"
                        defaultValue={editingCoupon?.value_type}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder='Select Value Type'
                            >
                                <option value="fixed">Fixed</option>
                                <option value="percentage">Percentage</option>
                            </Select>
                        )}
                    />
                    {errors.value_type && <InputError message={errors.value_type.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Disable Coupon?</Label>
                    <Controller
                        control={control}
                        name="is_disabled"
                        render={({ field }) => (
                            <Toggle
                                enabled={field.value}
                                setEnabled={field.onChange}
                            />
                        )}
                    />
                    {errors.is_disabled && <InputError message={errors.is_disabled.message} />}
                </div>

            </div>

            <PrimaryButton
                type="submit"
                className="w-full"
                disabled={isPending}
            >
                {isPending ? 'Loading...' : 'Update Coupon'}
            </PrimaryButton>
        </form>
    )
}

export default EditCouponForm