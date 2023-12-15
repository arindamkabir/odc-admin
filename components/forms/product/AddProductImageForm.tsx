import React, { useMemo } from 'react'
import Label from '../../common/form/Label'
import FileInput from '../../common/form/FileInput'
import useStore from '@/store/store';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Product } from '@/types/Product';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import InputError from '@/components/common/form/InputError';
import { StoreProductImageRequest, useStoreProductImage } from '@/hooks/mutations/product/useStoreProductImage';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

type StoreProductImageInputs = Omit<StoreProductImageRequest, "id">;

const AddProductImageForm = ({ id }: { id: Product["id"] }) => {
    const router = useRouter();
    const showAddProductImageDrawer = useStore(state => state.showAddProductImageDrawer);

    const { register, handleSubmit, control, watch, formState: { errors }, setValue, setError } = useForm<StoreProductImageInputs>({});

    const { mutate, isPending } = useStoreProductImage(() => { showAddProductImageDrawer(false); router.replace(router.asPath); });

    const updateImage: SubmitHandler<StoreProductImageInputs> = async (data) => {
        console.log(data);
        mutate({
            id,
            ...data
        });
    }

    const watchedImages = watch("images", []);

    const previewImages = useMemo(() => {
        return watchedImages.map(item => URL.createObjectURL(item));
    }, [watchedImages])

    const removeImage = (item: string, index: number) => {
        let copiedImages = watchedImages;
        copiedImages.splice(index, 1)
        setValue('images', copiedImages);
    }

    return (
        <form
            className="w-full flex flex-col h-full justify-between"
            onSubmit={handleSubmit(updateImage)}
        >
            <div className='space-y-1'>
                <Label>New Product Images</Label>

                <Controller
                    control={control}
                    defaultValue={[]}
                    name="images"
                    rules={{ required: { value: true, message: "Image is required." } }}
                    render={({ field }) => (
                        <FileInput
                            // value={field.value}
                            multiple
                            onChange={(e) => {
                                console.log(e.target.files);
                                field.onChange([...watchedImages, ...Array.from(e.target.files ?? [])]);
                            }}
                            disabled={field.disabled}
                        />
                    )}
                />

                <div className='grid grid-cols-4 gap-4 pt-6'>
                    {
                        previewImages.map((item, index) =>
                            <div key={item} className='w-20 h-20 relative'>
                                <button
                                    type="button"
                                    className='absolute -top-2 -right-2 text-white h-6 w-6 bg-error flex justify-center items-center rounded-full'
                                    onClick={() => removeImage(item, index)}
                                >
                                    <XMarkIcon className='h-4 w-4' />
                                </button>
                                <img src={item} className='rounded-md' />
                            </div>
                        )
                    }
                </div>

                {errors.images && <InputError message={errors.images.message} />}
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

export default AddProductImageForm;