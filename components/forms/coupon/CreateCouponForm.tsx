import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import Input from '@/components/common/form/Input';
import InputError from '@/components/common/form/InputError';
import Label from '@/components/common/form/Label';
import Select from '@/components/common/form/Select';
import Toggle from '@/components/common/form/Toggle';
import { StoreCouponRequest, useStoreCoupon } from '@/hooks/mutations/coupons/useStoreCoupon';
import useStore from '@/store/store';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const CreateCouponForm = () => {
    const showCreateCouponDrawer = useStore(state => state.showCreateCouponDrawer);

    const { register, handleSubmit, control, watch, formState: { errors }, setValue, setError } = useForm<StoreCouponRequest>({});

    const { mutate, isPending } = useStoreCoupon(setError, () => { showCreateCouponDrawer(false) });

    const storeCoupon: SubmitHandler<StoreCouponRequest> = async (data) => {
        mutate(data);
    }

    return (
        <form
            className="w-full flex flex-col h-full justify-between"
            onSubmit={handleSubmit(storeCoupon)}
        >
            <div className='space-y-4'>
                <div className='space-y-1'>
                    <Label>Code</Label>
                    <Input
                        type="text"
                        {...register('code', { required: { value: true, message: "Code is required." } })}
                    />
                    {errors.code && <InputError message={errors.code.message} />}
                </div>

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
                        {...register('redemptions', { required: { value: true, message: "Allowed redemptions is required." } })}
                    />
                    {errors.redemptions && <InputError message={errors.redemptions.message} />}
                </div>

                <div className='space-y-1'>
                    <Label>Value Type</Label>
                    <Select
                        placeholder='Select Value Type'
                        {...register('value_type', { required: { value: true, message: "Max value is required." } })}
                    >
                        <option value="fixed">Fixed</option>
                        <option value="percentage">Percentage</option>
                    </Select>
                    {errors.value_type && <InputError message={errors.value_type.message} />}
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
                    <Label>Disable Coupon?</Label>
                    <Controller
                        control={control}
                        defaultValue={false}
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
                isLoading={isPending}
            >
                Save
            </PrimaryButton>
        </form>
    )
}

export default CreateCouponForm