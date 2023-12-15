import React from 'react'
import Label from '../../common/form/Label'
import FileInput from '../../common/form/FileInput'
import { UpdateProductPrimaryImageRequest, useUpdateProductPrimaryImage } from '@/hooks/mutations/product/useUpdateProductPrimaryImage'
import useStore from '@/store/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Product } from '@/types/Product';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import InputError from '@/components/common/form/InputError';
import { useRouter } from 'next/router';

type UpdateProductPrimaryImageFormInputs = Omit<UpdateProductPrimaryImageRequest, "id">;

const UpdateProductPrimaryImageForm = ({ id }: { id: Product["id"] }) => {
    const router = useRouter();
    const showUpdateProductPrimaryImageDrawer = useStore(state => state.showUpdateProductPrimaryImageDrawer);

    const { register, handleSubmit, control, watch, formState: { errors }, setValue, setError } = useForm<UpdateProductPrimaryImageFormInputs>({
    });

    const { mutate, isPending } = useUpdateProductPrimaryImage(() => { showUpdateProductPrimaryImageDrawer(false); router.replace(router.asPath); });

    const updateImage: SubmitHandler<UpdateProductPrimaryImageFormInputs> = async (data) => {
        console.log(data);
        mutate({
            id,
            ...data
        });
    }

    return (
        <form
            className="w-full flex flex-col h-full justify-between"
            onSubmit={handleSubmit(updateImage)}
        >
            <div className='space-y-1'>
                <Label>Primary Image</Label>
                <FileInput
                    {...register('primary_img', { required: { value: true, message: "The primary image is required." } })}
                />

                {errors.primary_img && <InputError message={errors.primary_img.message} />}
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

export default UpdateProductPrimaryImageForm