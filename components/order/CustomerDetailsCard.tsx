import React from 'react'
import PrimaryButton from '../common/buttons/PrimaryButton'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import Card from '../common/Card';
import { OrderWProductAndBilling } from '@/types/Order';

const CustomerDetailsCard = ({ order }: { order: OrderWProductAndBilling }) => {
    return (
        <Card
            header='Customer Information'
            action={
                <button
                    type="button"
                //   onClick={() => {
                //       setEditingProduct(product);
                //       showEditProductDrawer(true);
                //   }}
                >
                    Edit
                </button>
            }
        >
            <div>
                <dl className="divide-y divide-neutral">
                    {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">User</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0"></dd>
                    </div> */}
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Name</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{`${order.shipping?.f_name} ${order.shipping?.l_name}`}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Phone</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{order.shipping?.phone}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Email</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{order.shipping?.email}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Shipping Address</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{order.shipping?.full_address}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Billing Address</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{order.billing?.full_address ?? order.shipping?.full_address}</dd>
                    </div>
                </dl>
            </div>
        </Card>
    )
}

export default CustomerDetailsCard;