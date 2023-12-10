import SEO from '@/components/common/SEO';
import SearchInput from '@/components/common/SearchInput';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import Select from '@/components/common/form/Select';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import OrdersTable from '@/components/tables/OrdersTable';
import useStore from '@/store/store';
import { useRouter } from 'next/router';
import React from 'react'

const STATUSES = [
    {
        value: 'placed',
        label: "Placed",
        color: "bg-green-600"
    },
    {
        value: 'paid',
        label: "Paid",
        color: "bg-green-600"
    },
    {
        value: 'shipped',
        label: "Shipped",
        color: "bg-green-600"
    },
    {
        value: 'delivered',
        label: "Delivered",
        color: "bg-green-600"
    }, {
        value: 'cancelled',
        label: "Cancelled",
        color: "bg-red-600"
    },
    {
        value: 'returned',
        label: "Returned",
        color: "bg-red-600"
    }
];

const OrderIndexPage = () => {
    // const setShowingCreateProductDrawer = useStore(state => state.setShowingCreateProductDrawer);
    const router = useRouter();
    const orderListQueryParams = useStore(state => state.orderListQueryParams);
    const setOrderListQueryParams = useStore(state => state.setOrderListQueryParams);

    return (
        <DashboardLayout>
            <SEO title="Orders" />
            <div className="flex items-center justify-between mb-10">
                <SearchInput
                    value={orderListQueryParams.search}
                    onChange={(value) => setOrderListQueryParams({ page: 1, search: value, status: null })}
                />
                <div className="flex space-x-3 items-center">
                    <Select
                        placeholder={"Select a status"}
                        value={orderListQueryParams.status ?? undefined}
                        onChange={(event) => setOrderListQueryParams({ ...orderListQueryParams, status: event.target.value ?? null })}
                    >
                        {STATUSES.map(item =>
                            <option
                                value={item.value}
                                key={`status-filter-${item.value}`}
                            >
                                {item.label}
                            </option>
                        )}
                    </Select>

                    <PrimaryButton
                        onClick={() => router.push('/orders/add')}
                    >
                        Add New
                    </PrimaryButton>
                </div>

            </div>

            <OrdersTable />
        </DashboardLayout>
    )
}

export default OrderIndexPage;