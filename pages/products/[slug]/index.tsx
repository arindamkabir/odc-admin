import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import AddProductImageDrawer from '@/components/drawers/product/AddProductImageDrawer';
import EditProductDrawer from '@/components/drawers/product/EditProductDrawer';
import UpdateProductPrimaryImageDrawer from '@/components/drawers/product/UpdateProductPrimaryImageDrawer';
import CreateStockDrawer from '@/components/drawers/stock/CreateStockDrawer';
import EditStockDrawer from '@/components/drawers/stock/EditStockDrawer';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import ProductStocksTable from '@/components/tables/ProductStocksTable';
import axios from '@/lib/axios';
import useStore from '@/store/store';
import { Product, ProductImage } from '@/types/Product';
import { Tab } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react'

export const getServerSideProps = (async (context) => {
    const slug = context.params?.slug as string || 'random-slug';
    const { req, res } = context;
    try {
        const response = await axios.get<{ product: Product & { extra_images: ProductImage<null>[] } }>(`/api/admin/products/${slug}`, {
            headers: {
                // origin: process.env.NEXT_PUBLIC_APP_ORIGIN ?? 'localhost:3000',
                // Cookie: req.headers.cookie
                ...req.headers
            }
        });

        const product = response.data.product;

        return { props: { product } }
    } catch (e) {
        console.error(e);
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        };
    }
}) satisfies GetServerSideProps<{
    product: Product & { extra_images: ProductImage<null>[] }
}>


export default function ProductPage({ product }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const showCreateStockDrawer = useStore(state => state.showCreateStockDrawer);
    const setEditingProduct = useStore(state => state.setEditingProduct);
    const showEditProductDrawer = useStore(state => state.showEditProductDrawer);
    const showUpdateProductPrimaryImageDrawer = useStore(state => state.showUpdateProductPrimaryImageDrawer);
    const showAddProductImageDrawer = useStore(state => state.showAddProductImageDrawer);

    console.log(product)

    return (
        <DashboardLayout>
            <div className="lg:grid lg:grid-cols-3 lg:gap-x-8 lg:items-start">
                <div>
                    <Tab.Group as="div" className="flex flex-col-reverse ">
                        {/* Image selector */}
                        <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                            <Tab.List className="grid grid-cols-4 gap-6">
                                {[product.primary_image, ...product.extra_images].map((image) => (
                                    <Tab
                                        key={image.id}
                                        className="group relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-black cursor-pointer hover:bg-gray-50 focus:outline-none"
                                    >
                                        {({ selected }) => (
                                            <>
                                                <div className='hidden group-hover:block absolute z-10 top-0 right-0'>
                                                    <span
                                                        className=' text-white h-6 w-6 bg-error flex justify-center items-center rounded-full'
                                                    // onClick={() => removeImage(item, index)}
                                                    >
                                                        <XMarkIcon className='h-4 w-4' />
                                                    </span>
                                                </div>
                                                <span className="absolute inset-0 rounded-md overflow-hidden">
                                                    <img src={image.full_url} alt="" className="w-full h-full object-center object-cover" />
                                                </span>
                                                <span
                                                    className={clsx(
                                                        selected ? 'ring-black' : 'ring-transparent',
                                                        'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </>
                                        )}
                                    </Tab>
                                ))}
                            </Tab.List>
                        </div>

                        <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                            {[product.primary_image, ...product.extra_images].map((image) => (
                                <Tab.Panel key={`panel-${image.id}`}>
                                    <img
                                        src={image.full_url}
                                        alt={""}
                                        className="w-full h-full object-center object-cover sm:rounded-lg"
                                    />
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>

                    <div className="flex justify-center space-x-4 mt-6">
                        <PrimaryButton onClick={() => showAddProductImageDrawer(true)}>
                            Add More Images
                        </PrimaryButton>

                        <PrimaryButton onClick={() => showUpdateProductPrimaryImageDrawer(true)}>
                            Update Primary Image
                        </PrimaryButton>
                    </div>
                </div>
                {/* Image gallery */}


                {/* Product info */}
                <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 col-span-2">
                    <div className='rounded-md p-6'>
                        <div className="px-4 sm:px-0 flex items-center justify-between">
                            <h3 className="text-base font-semibold leading-7">Product Information</h3>
                            <PrimaryButton
                                onClick={() => {
                                    setEditingProduct(product);
                                    showEditProductDrawer(true);
                                }}
                            >
                                Edit
                            </PrimaryButton>
                        </div>
                        <div className="mt-6">
                            <dl className="divide-y divide-neutral">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6">Name</dt>
                                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{product.name}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6">SKU</dt>
                                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{product.SKU}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6">Category</dt>
                                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{product.category.name}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6">Price</dt>
                                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">৳ {product.price}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6">Sales Price</dt>
                                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{product.sales_price ? `৳ ${product.sales_price}` : 'Not Set'}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6">Has Colors</dt>
                                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{product.has_colors ? 'Yes' : 'No'}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6">Has Sizes</dt>
                                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{product.has_sizes ? 'Yes' : 'No'}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6">Is Featured?</dt>
                                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{product.is_featured ? 'Yes' : 'No'}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6">Is Hidden?</dt>
                                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{product.is_hidden ? 'Yes' : 'No'}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6">Description</dt>
                                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                                        {product.description}
                                    </dd>
                                </div>

                            </dl>
                        </div>
                    </div>


                </div>
            </div>

            <div className='mt-6'>
                <div className="px-4 sm:px-0 flex items-center justify-between mb-6">
                    <h3 className="text-base font-semibold leading-7">Stock Information</h3>
                    <PrimaryButton onClick={() => showCreateStockDrawer(true)}>
                        Add
                    </PrimaryButton>
                </div>
                <ProductStocksTable product_id={product.id} />
            </div>

            <EditProductDrawer />
            <CreateStockDrawer product_id={product.id} />
            <EditStockDrawer />
            <UpdateProductPrimaryImageDrawer id={product.id} />
            <AddProductImageDrawer id={product.id} />
        </DashboardLayout>
    )
}
