import { OrderDeliveryLocation, OrderStatus } from "@/types/Order";

export const DELIVERY_LOCATIONS = [
    { id: 1, title: 'Dhaka', turnaround: '2-4 business days', price: 70 },
    { id: 2, title: 'Outside Dhaka', turnaround: '4-7 business days', price: 200 },
];

export const STATUS_CLASSES: Record<OrderStatus, string> = {
    "placed": "bg-green-600",
    "paid": "bg-green-600",
    "shipped": "bg-green-600",
    "delivered": "bg-green-600",
    "cancelled": "bg-red-600",
    "returned": "bg-red-600"
};

export const DELIVERY_LOCATION_LABELS: Record<OrderDeliveryLocation, string> = {
    "dhaka": "Dhaka",
    "outside_bd": "Outside Bangladesh",
    "outside_dhaka": "Outside Dhaka"
};