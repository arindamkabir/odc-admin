import React from 'react'
import Card from '../common/Card'
import { OrderWProductAndBilling } from '@/types/Order'
import Link from 'next/link'

const ProductListCard = ({ order }: { order: OrderWProductAndBilling }) => {
    return (
        <Card header='Order Items'>
            <ul role="list" className="divide-y divide-neutral">
                {order.order_items.map((item, productIdx) => (
                    <li key={item.id} className="flex py-6 sm:py-10">
                        <div className="flex-shrink-0">
                            <img
                                src={item.stock.product.primary_image?.full_url}
                                alt={item.stock.product.name}
                                className="w-24 h-24 rounded-lg object-center object-cover sm:w-32 sm:h-32"
                            />
                        </div>

                        <div className="relative ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                            <div>
                                <div className="flex justify-between sm:grid sm:grid-cols-2">
                                    <div className="pr-6">
                                        <h3 className="text-sm">
                                            <Link href={`/products/${item.stock.product.slug}`} className="font-medium">
                                                {item.stock.product.name}
                                            </Link>
                                        </h3>
                                        {item.stock.color ? <p className="mt-1 text-sm text-gray-300">{item.stock.color.name}</p> : null}
                                        {item.stock.size ? <p className="mt-1 text-sm text-gray-300">{item.stock.size.name}</p> : null}
                                    </div>

                                    <p className="text-sm font-medium text-right">৳ {item.price}</p>
                                </div>

                                <div className="mt-4 flex items-center sm:block sm:absolute sm:top-0 sm:left-1/2 sm:mt-0">
                                    <select
                                        id={`quantity-${productIdx}`}
                                        name={`quantity-${productIdx}`}
                                        className="block max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium  text-left shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
                                    >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                    </select>

                                    <button
                                        type="button"
                                        className="ml-4 text-sm font-medium hover:text-primary sm:ml-0 sm:mt-3"
                                    >
                                        <span>Remove</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>


            <div className="flex justify-end mt-6">
                <dl className="divide-y divide-neutral w-[30rem]">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Subtotal</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">৳ 213123</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Discount</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">৳ 123</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Total</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">৳ 123</dd>
                    </div>
                    {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6">Price</dt>
                            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0"></dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6">Sales Price</dt>
                            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0"></dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6">Has Colors</dt>
                            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0"></dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6">Has Sizes</dt>
                            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0"></dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6">Is Featured?</dt>
                            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0"></dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6">Is Hidden?</dt>
                            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0"></dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6">Description</dt>
                            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">

                            </dd>
                        </div> */}

                </dl>
            </div>
        </Card>
    )
}

export default ProductListCard