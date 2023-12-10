import PrimaryButton from '@/components/common/buttons/PrimaryButton'
import Input from '@/components/common/form/Input'
import InputError from '@/components/common/form/InputError'
import Label from '@/components/common/form/Label'
import AddOrderProductDrawer from '@/components/drawers/order/AddOrderProductDrawer'
import OrderProductListDrawer from '@/components/drawers/order/OrderProductListDrawer'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import useStore from '@/store/store'
import React from 'react'

const AddOrderPage = () => {
    const showOrderProductListDrawer = useStore(state => state.showOrderProductListDrawer);
    const orderProductList = useStore(state => state.orderProductList);
    const removeOrderProduct = useStore(state => state.removeOrderProduct);

    return (
        <DashboardLayout header='Add Order Page'>
            <div className="grid grid-cols-2 gap-10">
                <form
                    className="w-full flex flex-col h-full justify-between"
                // onSubmit={handleSubmit(storeCategory)}
                >
                    <div className='space-y-4 mb-8'>
                        <div className='space-y-1'>
                            <Label>Phone Number</Label>
                            <Input
                                type="text"
                            // {...register('name', { required: { value: true, message: "Name is required." } })}
                            />
                            {/* {errors.name && <InputError message={errors.name.message} />} */}
                        </div>

                        <div className='space-y-1'>
                            <Label>Email</Label>
                            <Input
                                type="email"
                            // {...register('name', { required: { value: true, message: "Name is required." } })}
                            />
                            {/* {errors.name && <InputError message={errors.name.message} />} */}
                        </div>

                        <div className='space-y-1'>
                            <Label>Address</Label>
                            <Input
                                type="text"
                            // {...register('name', { required: { value: true, message: "Name is required." } })}
                            />
                            {/* {errors.name && <InputError message={errors.name.message} />} */}
                        </div>

                        <div className='space-y-1'>
                            <Label>Apartment, suite, etc.</Label>
                            <Input
                                type="text"
                            // {...register('name', { required: { value: true, message: "Name is required." } })}
                            />
                            {/* {errors.name && <InputError message={errors.name.message} />} */}
                        </div>

                        <div className='space-y-1'>
                            <Label>City</Label>
                            <Input
                                type="text"
                            // {...register('name', { required: { value: true, message: "Name is required." } })}
                            />
                            {/* {errors.name && <InputError message={errors.name.message} />} */}
                        </div>

                        <div className='space-y-1'>
                            <Label>State</Label>
                            <Input
                                type="text"
                            // {...register('name', { required: { value: true, message: "Name is required." } })}
                            />
                            {/* {errors.name && <InputError message={errors.name.message} />} */}
                        </div>

                        <div className='space-y-1'>
                            <Label>Postal Code</Label>
                            <Input
                                type="text"
                            // {...register('name', { required: { value: true, message: "Name is required." } })}
                            />
                            {/* {errors.name && <InputError message={errors.name.message} />} */}
                        </div>
                    </div>

                    <PrimaryButton
                        type="submit"
                    // isLoading={isPending}
                    >
                        Save
                    </PrimaryButton>
                </form>
                <div className="min-h-full bg-base-300 rounded-md p-8">
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