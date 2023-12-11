import Drawer from '@/components/common/Drawer';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import Input from '@/components/common/form/Input';
import Select from '@/components/common/form/Select';
import { useGetProductInfiniteList } from '@/hooks/queries/product/useGetInfiniteProduct';
import useStore from '@/store/store';
import { Color } from '@/types/Color';
import { SavingOrderProduct } from '@/types/Order';
import { Size } from '@/types/Size';
import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

const AddOrderProductDrawer = () => {
    const showingAddOrderProductDrawer = useStore(state => state.showingAddOrderProductDrawer);
    const showAddOrderProductDrawer = useStore(state => state.showAddOrderProductDrawer);
    const setSelectedOrderProduct = useStore(state => state.setSelectedOrderProduct);
    const selectedOrderProduct = useStore(state => state.selectedOrderProduct);
    const showOrderProductListDrawer = useStore(state => state.showOrderProductListDrawer);
    const addOrderProduct = useStore(state => state.addOrderProduct);

    const [selectedColor, setSelectedColor] = useState<Color | null>(null);
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const [quantity, setQuantity] = useState<number>(0);

    useEffect(() => {
        setSelectedSize(null);
        setSelectedColor(null);
        setQuantity(0);
    }, [selectedOrderProduct])

    const { colors: availableColors, sizes } = useMemo(() => {
        let colors: Color[] = [];
        let sizes: Size[] = [];
        if (!selectedOrderProduct) return {
            colors: [],
            sizes: []
        };
        selectedOrderProduct.stocks.forEach(item => {
            if (item.color) {
                colors.push(item.color);
            }
            if (item.size) {
                sizes.push(item.size);
            }
        });

        return { colors, sizes };
    }, [selectedOrderProduct]);

    const selectedStock = useMemo(() => {
        if (!selectedOrderProduct) return undefined;
        const stock = selectedOrderProduct.stocks.find(item => item.color_id === (selectedColor?.id ?? null) && item.size_id === (selectedSize?.id ?? null));
        if (!stock) return undefined;
        return stock;
    }, [selectedColor?.id, selectedOrderProduct, selectedSize?.id]);

    const availableSizes = useMemo(() => {
        if (!selectedOrderProduct) return [];
        if (selectedOrderProduct?.has_colors && selectedOrderProduct?.has_sizes) {
            if (!selectedColor) return [];
            return sizes.map((item) => {
                let exists = selectedOrderProduct?.stocks.some(stock => stock.color_id === selectedColor.id && stock.size_id === item.id && stock.quantity > 0);
                if (exists) return {
                    ...item,
                    inStock: exists
                }
                else {
                    return {
                        ...item,
                        inStock: false
                    }
                }
            })
        }
        else if (!selectedOrderProduct?.has_colors && selectedOrderProduct?.has_sizes) {
            return sizes.map((item) => {
                let exists = selectedOrderProduct?.stocks.some(stock => stock.size_id === item.id && stock.quantity > 0);
                if (exists) return {
                    ...item,
                    inStock: exists
                }
                else {
                    return {
                        ...item,
                        inStock: false
                    }
                }
            })
        }
        else return null;
    }, [selectedOrderProduct?.has_colors, selectedOrderProduct?.has_sizes, selectedOrderProduct?.stocks, selectedColor, sizes]);

    const handleAddProduct = () => {
        if (!selectedOrderProduct) return;
        if (!selectedStock) return;
        if (selectedOrderProduct.has_colors && !selectedColor) return;
        if (selectedOrderProduct.has_sizes && !selectedSize) return;
        if (!quantity) return;

        const orderProduct: SavingOrderProduct = {
            id: selectedOrderProduct.id,
            name: selectedOrderProduct.name,
            slug: selectedOrderProduct.slug,
            category_id: selectedOrderProduct.category_id,
            description: selectedOrderProduct.description,
            price: selectedOrderProduct.price,
            SKU: selectedOrderProduct.SKU,
            stock: selectedStock,
            orderQuantity: quantity,
            primary_image: selectedOrderProduct.primary_image
        }

        addOrderProduct(orderProduct);

        setSelectedSize(null);
        setSelectedColor(null);
        setQuantity(0);

        showAddOrderProductDrawer(false);
        setSelectedOrderProduct(null);
        showOrderProductListDrawer(true);
    }

    return (
        <Drawer
            title={"Add Product to Order"}
            open={showingAddOrderProductDrawer}
            onClose={() => {
                showAddOrderProductDrawer(false);
                setSelectedOrderProduct(null);
                showOrderProductListDrawer(true);
            }}
        >
            {selectedOrderProduct ?
                <>
                    <li className="flex flex-col items-center py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                                src={selectedOrderProduct.primary_image.full_url}
                                alt={selectedOrderProduct.name}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>

                        <div>
                            <div className="flex flex-col items-center space-y-3 justify-between text-sm pt-4">
                                <h3>
                                    {selectedOrderProduct.name}
                                </h3>
                                <p className="ml-4 whitespace-nowrap">৳ {selectedStock?.price ?? selectedOrderProduct.price}</p>
                            </div>
                        </div>

                        <div className="space-y-8 mt-4">
                            {
                                selectedOrderProduct.has_colors ?
                                    <div>
                                        <h2 className="text-sm font-medium">Colors</h2>

                                        <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                                            <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                            <div className="flex items-center space-x-3">
                                                {availableColors.map((color) => (
                                                    <RadioGroup.Option
                                                        key={color.name}
                                                        value={color}
                                                        className={({ active, checked }) =>
                                                            clsx(
                                                                // color.hex_code,
                                                                active && checked ? 'ring ring-primary ring-offset-1' : '',
                                                                !active && checked ? 'ring-2 ring-primary' : '',
                                                                '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                                            )
                                                        }
                                                    >
                                                        <RadioGroup.Label as="p" className="sr-only">
                                                            {color.name}
                                                        </RadioGroup.Label>
                                                        <span
                                                            aria-hidden="true"
                                                            className={clsx('h-8 w-8 border border-primary border-opacity-10 rounded-full')}
                                                            style={{ backgroundColor: color.hex_code }}
                                                        />
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    : null
                            }

                            {
                                (selectedOrderProduct.has_sizes && (selectedOrderProduct.has_colors ? Boolean(selectedColor) ? true : false : true) && availableSizes) ?
                                    <div className="">
                                        <h2 className="text-sm font-medium">Sizes</h2>

                                        <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-2">
                                            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 justify-center">
                                                {availableSizes.map((size) => (
                                                    <RadioGroup.Option
                                                        key={size.name}
                                                        value={size}
                                                        className={({ active, checked }) =>
                                                            clsx(
                                                                size.inStock ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed rounded-md',
                                                                checked
                                                                    ? 'bg-primary border-transparent hover:bg-primary'
                                                                    : 'bg-neutral text-neutral-content border-neutral',
                                                                'border py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 rounded-md'
                                                            )
                                                        }
                                                        disabled={!size.inStock}
                                                    >
                                                        <RadioGroup.Label as="p">{size.name}</RadioGroup.Label>
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    : null
                            }

                            <Input type="number" value={quantity} onChange={(event) => setQuantity(+event.target.value)} />

                            <PrimaryButton
                                onClick={handleAddProduct}
                                disabled={(!Boolean(selectedStock) || !quantity || (quantity > (selectedStock?.quantity ?? 0)))}
                            >
                                {!selectedStock ? 'Select an option' : 'Add'}
                            </PrimaryButton>
                        </div>



                    </li>
                </>
                : null
            }

        </Drawer>
    )
}

export default AddOrderProductDrawer