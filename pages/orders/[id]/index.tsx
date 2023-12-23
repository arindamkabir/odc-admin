import Card from '@/components/common/Card'
import DashboardLoader from '@/components/common/DashboardLoader'
import PageLoader from '@/components/common/PageLoader'
import PrimaryButton from '@/components/common/buttons/PrimaryButton'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import CustomerDetailsCard from '@/components/order/CustomerDetailsCard'
import PaymentDetailsCard from '@/components/order/PaymentDetailsCard'
import ProductListCard from '@/components/order/ProductListCard'
import ShippingBillingCard from '@/components/order/ShippingBillingCard'
import { DELIVERY_LOCATION_LABELS, STATUS_CLASSES } from '@/config/order'
import { useGetOrderDetail } from '@/hooks/queries/order/useGetOrderDetail'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

const OrderPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const orderId = useMemo(() => (Array.isArray(id)) ? id[0] : id, [id]);

    const { data, isFetching } = useGetOrderDetail(orderId);

    return (
        <DashboardLayout>
            {
                <>
                    {
                        (!data || isFetching) ? <PageLoader /> :
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className='space-y-8'>
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                        <Card>
                                            <div className="flex mb-5 items-center justify-between">
                                                <h3 className="text-base leading-6 font-medium">
                                                    Order Status
                                                </h3>
                                                <button type='button' className='btn btn-ghost text-sm'>Update</button>
                                            </div>
                                            <div className="mb-3">
                                                <span className={`leading-6 text-sm uppercase ${STATUS_CLASSES[data.status]} rounded-full text-white py-1.5 px-4`}>
                                                    {data.status}
                                                </span>
                                            </div>
                                        </Card>
                                        <Card>
                                            <div className="flex mb-5 items-center justify-between">
                                                <h3 className="text-base leading-6 font-medium">
                                                    Order Platform
                                                </h3>
                                                <button type='button' className='btn btn-ghost text-sm disabled:bg-transparent' disabled></button>
                                            </div>
                                            <div className="mb-3">
                                                <span className={`leading-6 text-base font-semibold uppercase rounded-full`}>
                                                    {data.platform}
                                                </span>
                                            </div>
                                        </Card>
                                        <Card>
                                            <div className="flex mb-5 items-center justify-between">
                                                <h3 className="text-base leading-6 font-medium">
                                                    Delivery Location
                                                </h3>
                                                <button type='button' className='btn btn-ghost text-sm disabled:bg-transparent' disabled></button>
                                            </div>
                                            <div className="mb-3">
                                                <span className={`leading-6 text-base font-semibold uppercase rounded-full`}>
                                                    {DELIVERY_LOCATION_LABELS[data.delivery_location]}
                                                </span>
                                            </div>
                                        </Card>
                                    </div>

                                    {/* <CustomerDetailsCard order={data} /> */}
                                    <>
                                        {data.shipping ?
                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                                <ShippingBillingCard address={data.shipping} />
                                                <ShippingBillingCard billing address={data.billing ?? data.shipping} />
                                            </div>
                                            : null
                                        }
                                    </>

                                    <PaymentDetailsCard order={data} />
                                </div>
                                <ProductListCard order={data} />
                            </div>
                    }
                </>
            }
        </DashboardLayout>

    )
}

export default OrderPage;