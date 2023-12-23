import Drawer from '@/components/common/Drawer';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import { useGetProductInfiniteList } from '@/hooks/queries/product/useGetInfiniteProduct';
import useStore from '@/store/store';
import { PlusIcon } from '@heroicons/react/24/solid';
import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

const OrderProductListDrawer = () => {
    const showingOrderProductListDrawer = useStore(state => state.showingOrderProductListDrawer);
    const showOrderProductListDrawer = useStore(state => state.showOrderProductListDrawer);
    const showAddOrderProductDrawer = useStore(state => state.showAddOrderProductDrawer);
    const setSelectedOrderProduct = useStore(state => state.setSelectedOrderProduct);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    } = useGetProductInfiniteList();

    // useEffect(() => {
    //     fetchNextPage()
    // }, [data])

    // console.log(data)

    console.log(hasNextPage)

    return (
        <Drawer
            drawerScollableDivID={`add-product-order-id`}
            title={"Add Product to Order"}
            open={showingOrderProductListDrawer}
            onClose={() => showOrderProductListDrawer(false)}
        >
            {/* {
                status === 'pending' ? (
                    <p>Loading...</p>
                ) : status === 'error' ? (
                    <p>Error: {error.message}</p>
                ) : ( */}
            <div>
                <InfiniteScroll
                    dataLength={data?.pages.reduce((acc, currentPage) => acc + currentPage.data.length, 0) ?? 0}
                    next={fetchNextPage}
                    hasMore={hasNextPage} // Replace with a condition based on your data source
                    loader={<p>Loading...</p>}
                    endMessage={<p className='text-xs'>No more data to load.</p>}
                    scrollableTarget={'add-product-order-id'}
                >
                    <ul>
                        {data?.pages.map((group, i) => (
                            <React.Fragment key={i}>
                                {group.data.map((product) => (
                                    <li className="flex py-6" key={`order-product-${product.slug}`}>
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={product.primary_image?.full_url}
                                                alt={product.name}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-xs space-x-3">
                                                    <div className="space-y-1.5">
                                                        <h3>Name: {product.name}</h3>
                                                        <h3>SKU: {product.SKU}</h3>
                                                    </div>

                                                    <button
                                                        type='button'
                                                        className="btn btn-square"
                                                        onClick={() => { setSelectedOrderProduct(product); showOrderProductListDrawer(false); showAddOrderProductDrawer(true); }}
                                                    >
                                                        <PlusIcon className='h-5 w-5' />
                                                    </button>
                                                </div>
                                                {/* {
                                                            (product.stock.color)
                                                                ?
                                                                <div className="mt-1 text-sm text-gray-500 flex items-center space-x-2">
                                                                    <span className='capitalize'>{product.stock.color.name}</span>
                                                                    <div style={{ height: '16px', width: '16px', backgroundColor: product.stock.color.hex_code, borderRadius: 9999 }}></div>
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
                                                        <div className="text-gray-500 flex items-center space-x-2"><span>Quantity:</span><ProductQtyInput product={product} /></div>

                                                        <div className="flex">
                                                            <button
                                                                type="button"
                                                                className="font-medium text-black hover:text-black text-sm hover:underline hover:underline-offset-1 hover:underline-black"
                                                                onClick={() => removeFromCart(product.id, product.stock.id)}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div> */}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </React.Fragment>
                        ))}
                    </ul>
                </InfiniteScroll>
            </div >
            {/* )
            } */}

        </Drawer>
    )
}

export default OrderProductListDrawer