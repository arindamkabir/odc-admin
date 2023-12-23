import { OrderAddress, OrderWProductAndBilling } from '@/types/Order'
import React from 'react'
import Card from '../common/Card'
import { MapPinIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/solid'

const ShippingBillingCard = ({ address, billing }: { address: OrderAddress, billing?: boolean }) => {
    return (
        <Card
            header={`${billing ? 'Billing' : 'Shipping'} Information`}
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
            <div className='space-y-3'>
                <div className='flex items-center text-sm font-medium leading-6'>
                    <span><UserIcon className='h-4 w-4 mr-3' /></span>{`${address.f_name} ${address.l_name}`}
                </div>
                <div className='flex items-center text-sm font-medium leading-6'>
                    <span><PhoneIcon className='h-4 w-4 mr-3' /></span>{`${address.phone}`}
                </div>
                <div className='flex items-center text-sm font-medium leading-6'>
                    <span><MapPinIcon className='h-4 w-4 mr-3' /></span>{`${address.full_address}`}
                </div>
            </div>
        </Card>
    )
}

export default ShippingBillingCard