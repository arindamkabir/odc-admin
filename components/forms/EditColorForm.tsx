import useStore from '@/store/store';
import React, { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Label from '../common/form/Label';
import Input from '../common/form/Input';
import InputError from '../common/form/InputError';
import PrimaryButton from '../common/buttons/PrimaryButton';
import { UpdateColorRequest, useUpdateColor } from '@/hooks/mutations/color/useUpdateColor';
import ColorPicker from '../common/form/ColorPicker';

type UpdateColorFormState = Omit<UpdateColorRequest, 'id'>;

const EditColorForm = () => {
    const editingColor = useStore(state => state.editingColor);
    const showEditColorDrawer = useStore(state => state.showEditColorDrawer);

    const { register, handleSubmit, formState: { errors }, control, reset, setError } = useForm<UpdateColorFormState>({
        defaultValues: {
            name: editingColor?.name ?? '',
            hex_code: editingColor?.hex_code ?? '#000000'
        }
    });

    useEffect(() => {
        if (!editingColor) return;
        reset()
    }, [editingColor, reset]);

    const { mutate, isPending } = useUpdateColor(setError, () => { showEditColorDrawer(false) });

    const updateColor: SubmitHandler<UpdateColorFormState> = async (data) => {
        if (!editingColor) return;
        mutate({
            id: editingColor.id,
            ...data
        });
    }

    return (
        <form
            className="w-full flex flex-col h-full justify-between"
            onSubmit={handleSubmit(updateColor)}
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
}

export default EditColorForm;