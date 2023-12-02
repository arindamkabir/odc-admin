import { StoreSizeRequest, useStoreSize } from '@/hooks/mutations/size/useStoreSize';
import useStore from '@/store/store';
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Label from '../common/form/Label';
import Input from '../common/form/Input';
import InputError from '../common/form/InputError';
import PrimaryButton from '../common/buttons/PrimaryButton';

const CreateSizeForm = () => {
    const showCreateSizeDrawer = useStore(state => state.showCreateSizeDrawer);

    const { register, handleSubmit, formState: { errors }, setError } = useForm<StoreSizeRequest>({});

    const { mutate, isPending } = useStoreSize(setError, () => { showCreateSizeDrawer(false) });

    const storeSize: SubmitHandler<StoreSizeRequest> = async (data) => {
        mutate(data);
    }

    return (
        <form
            className="w-full flex flex-col h-full justify-between"
            onSubmit={handleSubmit(storeSize)}
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
};

export default CreateSizeForm;