import useStore from '@/store/store';
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import Label from '../common/form/Label';
import Input from '../common/form/Input';
import InputError from '../common/form/InputError';
import PrimaryButton from '../common/buttons/PrimaryButton';
import { UpdateSizeRequest, useUpdateSize } from '@/hooks/mutations/size/useUpdateSize';

type UpdateSizeFormState = Omit<UpdateSizeRequest, 'id'>;

const EditSizeForm = () => {
    const editingSize = useStore(state => state.editingSize);
    const showEditSizeDrawer = useStore(state => state.showEditSizeDrawer);

    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<UpdateSizeFormState>({
        defaultValues: {
            name: editingSize?.name ?? ''
        }
    });

    useEffect(() => {
        if (!editingSize) return;
        reset()
    }, [editingSize, reset]);

    const { mutate, isPending } = useUpdateSize(setError, () => { showEditSizeDrawer(false) });

    const updateSize: SubmitHandler<UpdateSizeFormState> = async (data) => {
        if (!editingSize) return;
        mutate({
            id: editingSize.id,
            ...data
        });
    }

    return (
        <form
            className="w-full flex flex-col h-full justify-between"
            onSubmit={handleSubmit(updateSize)}
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

export default EditSizeForm;