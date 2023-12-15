import { StoreColorRequest, useStoreColor } from '@/hooks/mutations/color/useStoreColor';
import useStore from '@/store/store';
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Label from '../../common/form/Label';
import Input from '../../common/form/Input';
import InputError from '../../common/form/InputError';
import PrimaryButton from '../../common/buttons/PrimaryButton';
import { SketchPicker } from 'react-color';
import ColorPicker from '../../common/form/ColorPicker';

const CreateColorForm = () => {
    const showCreateColorDrawer = useStore(state => state.showCreateColorDrawer);

    const { register, handleSubmit, formState: { errors }, control, setError } = useForm<StoreColorRequest>({});

    const { mutate, isPending } = useStoreColor(setError, () => { showCreateColorDrawer(false) });

    const storeColor: SubmitHandler<StoreColorRequest> = async (data) => {
        console.log(data)
        mutate(data);
    }

    return (
        <form
            className="w-full flex flex-col h-full justify-between"
            onSubmit={handleSubmit(storeColor)}
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
                    <Label>Color</Label>
                    <Controller
                        control={control}
                        defaultValue={'#fff'}
                        name="hex_code"
                        rules={{ required: { value: true, message: "Color is required." } }}
                        render={({ field }) => (
                            <ColorPicker
                                color={field.value}
                                onChangeComplete={(color) => field.onChange(color.hex)}
                                disableAlpha={true}
                            />
                        )}
                    />
                    {errors.hex_code && <InputError message={errors.hex_code.message} />}
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

export default CreateColorForm;