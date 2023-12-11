import PrimaryButton from '@/components/common/buttons/PrimaryButton'
import Input from '@/components/common/form/Input'
import InputError from '@/components/common/form/InputError'
import Label from '@/components/common/form/Label'
import Select from '@/components/common/form/Select'
import AddOrderProductDrawer from '@/components/drawers/order/AddOrderProductDrawer'
import OrderProductListDrawer from '@/components/drawers/order/OrderProductListDrawer'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { useStoreOrder } from '@/hooks/mutations/order/useStoreOrder'
import useStore from '@/store/store'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

type NewOrderFormInput = {
    f_name: string,
    l_name: string,
    email: string,
    phone: string,
    company: string,
    address: string,
    address_2: string,
    city: string,
    state: string,
    zip_code: string,
    delivery_location: 'dhaka' | 'outside_dhaka'
}

const AddOrderPage = () => {
    const router = useRouter();
    const showOrderProductListDrawer = useStore(state => state.showOrderProductListDrawer);
    const orderProductList = useStore(state => state.orderProductList);
    const removeOrderProduct = useStore(state => state.removeOrderProduct);

    const { register, handleSubmit, control, watch, formState: { errors }, setValue, setError } = useForm<NewOrderFormInput>({
        defaultValues: {
            email: '',
            phone: '',
            company: '',
            address: '',
            address_2: '',
            city: '',
            state: '',
            zip_code: '',
            delivery_location: 'dhaka'
        }
    });

    const onSuccess = () => {
        toast.success('Order added successfully');
        router.push('/orders');
    }

    const { mutate } = useStoreOrder(setError, onSuccess);

    const addOrder: SubmitHandler<NewOrderFormInput> = async (data) => {
        console.log(data);

        if (orderProductList.length === 0) return;

        mutate({
            ...data,
            products: orderProductList.map(item => ({ id: item.id, stock_id: item.stock.id, quantity: item.orderQuantity }))
        })

        console.log(data);
    }


    return (
        <DashboardLayout header='Add Order Page'>
            <div className="grid grid-cols-2 gap-10">
                <form
                    className="w-full flex flex-col h-full"
                    onSubmit={handleSubmit(addOrder)}
                >
                    <h2 className="text-lg font-medium py-4">
                        Contact information
                    </h2>

                    <div className='space-y-4'>
                        <div className='space-y-1'>
                            <Label>Phone Number</Label>
                            <Input
                                type="text"
                                {...register('phone', { required: { value: true, message: "Phone is required." } })}
                            />
                            {errors.phone && <InputError message={errors.phone.message} />}
                        </div>

                        <div className='space-y-1'>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                {...register('email', { required: { value: true, message: "Email is required." } })}
                            />
                            {errors.email && <InputError message={errors.email.message} />}
                        </div>

                        <h2 className="text-lg font-medium py-4">
                            Shipping information
                        </h2>

                        <div className='space-y-4'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className='space-y-1'>
                                    <Label>First Name</Label>
                                    <Input
                                        type="text"
                                        {...register('f_name', { required: { value: true, message: "First Name is required." } })}
                                    />
                                    {errors.f_name && <InputError message={errors.f_name.message} />}
                                </div>
                                <div className='space-y-1'>
                                    <Label>Last Name</Label>
                                    <Input
                                        type="text"
                                        {...register('l_name', { required: { value: true, message: "Last Name is required." } })}
                                    />
                                    {errors.l_name && <InputError message={errors.l_name.message} />}
                                </div>
                            </div>

                            <div className='space-y-1'>
                                <Label>Address</Label>
                                <Input
                                    type="text"
                                    {...register('address', { required: { value: true, message: "Address is required." } })}
                                />
                                {errors.address && <InputError message={errors.address.message} />}
                            </div>

                            <div className='space-y-1'>
                                <Label>Apartment, suite, etc.</Label>
                                <Input
                                    type="text"
                                    {...register('address_2', { required: false })}
                                />
                                {errors.address_2 && <InputError message={errors.address_2.message} />}
                            </div>

                            <div className='space-y-1'>
                                <Label>City</Label>
                                <Input
                                    type="text"
                                    {...register('city', { required: { value: true, message: "City is required." } })}
                                />
                                {errors.city && <InputError message={errors.city.message} />}
                            </div>

                            <div className='space-y-1'>
                                <Label>State</Label>
                                <Input
                                    type="text"
                                    {...register('state', { required: { value: true, message: "State is required." } })}
                                />
                                {errors.state && <InputError message={errors.state.message} />}
                            </div>

                            <div className='space-y-1'>
                                <Label>Postal Code</Label>
                                <Input
                                    type="text"
                                    {...register('zip_code', { required: { value: true, message: "Postal code is required." } })}
                                />
                                {errors.zip_code && <InputError message={errors.zip_code.message} />}
                            </div>
                        </div>

                        <h2 className="text-lg font-medium py-4">
                            Delivery information
                        </h2>

                        <div className='space-y-1'>
                            <Label>Delivery Location</Label>
                            <Select
                                placeholder='Delivery Location'
                                {...register('delivery_location', { required: { value: true, message: "Delivery Location is required." } })}
                            >
                                <option value="dhaka">Dhaka</option>
                                <option value="outside_dhaka">Outside Dhaka</option>
                            </Select>
                            {errors.delivery_location && <InputError message={errors.delivery_location.message} />}

                        </div>
                    </div>

                    <PrimaryButton
                        type="submit"
                        className='mt-8'
                    // isLoading={isPending}
                    >
                        Save
                    </PrimaryButton>
                </form>
                <div className="max-h-full bg-base-300 rounded-md p-8 overflow-y-scroll">
                    <div className="flex items-center justify-between space-x-4 pb-6">
                        <h3 className=''>Order Products</h3>
                        <PrimaryButton onClick={() => showOrderProductListDrawer(true)}>Add Product</PrimaryButton>
                    </div>

                    <div className='space-y-3'>
                        {
                            orderProductList.length > 0 ?
                                orderProductList.map(product =>
                                    <div className="flex" key={`order-product-list-${product.slug}`}>
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={product.primary_image.full_url}
                                                alt={product.name}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-sm font-semibold ">
                                                    <h3>
                                                        {product.name}
                                                    </h3>
                                                    <p className="ml-4 whitespace-nowrap">৳ {product.stock.price}</p>
                                                </div>
                                                {
                                                    (product.stock.color)
                                                        ?
                                                        <div className="mt-1 text-sm text-gray-500 flex items-center space-x-2">
                                                            <span className='capitalize'>{product.stock.color.name}</span>
                                                            {/* <div style={{ height: '16px', width: '16px', backgroundColor: product.stock.color.hex_code, borderRadius: 9999 }}></div> */}
                                                        </div>
                                                        :
                                                        null
                                                }
                                                {
                                                    (product.stock.size)
                                                        ?
                                                        <div className="mt-1 text-sm text-gray-500">
                                                            <span className='uppercase'>{product.stock.size.name}</span>
                                                        </div>
                                                        :
                                                        null
                                                }
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div className="text-gray-500 flex items-center space-x-2">Quantity: {product.orderQuantity}</div>

                                                <div className="flex">
                                                    <button
                                                        type="button"
                                                        className="font-medium text-error text-sm hover:underline hover:underline-offset-1 hover:underline-black"
                                                        onClick={() => removeOrderProduct(product.id, product.stock.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                                :
                                <div className='flex flex-col items-center justify-center space-y-4'>
                                    <h1 className='text-lg'>
                                        No products added.
                                    </h1>

                                    <PrimaryButton onClick={() => showOrderProductListDrawer(true)}>Add Product</PrimaryButton>
                                </div>
                        }
                    </div>
                </div>
            </div>

            <OrderProductListDrawer />
            <AddOrderProductDrawer />
        </DashboardLayout>
    )
}

export default AddOrderPage;