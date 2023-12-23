import React from 'react'
import PrimaryButton from '../common/buttons/PrimaryButton'
import Card from '../common/Card'
import { OrderWProductAndBilling } from '@/types/Order'

const PaymentDetailsCard = ({ order }: { order: OrderWProductAndBilling }) => {
    return (
        <Card
            header='Payment Information'
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
            <div className="">
                <dl className="divide-y divide-neutral">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Payment Method</dt>
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
                </dl>
            </div>
        </Card>
    )
}

export default PaymentDetailsCard