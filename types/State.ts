import { CategoryListRequest } from "@/hooks/queries/category/useGetCategoryList";
import { ProductListRequest } from "@/hooks/queries/product/useGetProductList";
import { CategoryWithParentAndProductCount } from "./Category";
import { Color } from "./Color";
import { ColorListRequest } from "@/hooks/queries/color/useGetColorLists";
import { SizeListRequest } from "@/hooks/queries/size/useGetSizeList";
import { Size } from "./Size";
import { OrderListRequest } from "@/hooks/queries/order/useGetOrderList";
import { Product } from "./Product";
import { SavingOrderProduct } from "./Order";

export type ProductState = {
    showingCreateProductDrawer: boolean,
    productListQueryParams: ProductListRequest,
    setShowingCreateProductDrawer: (value: boolean) => void,
    setProductListQueryParams: (params: ProductListRequest) => void,
};

export type CategoryState = {
    showingCreateCategoryDrawer: boolean,
    showingEditCategoryDrawer: boolean,
    categoryListQueryParams: CategoryListRequest,
    editingCategory: CategoryWithParentAndProductCount | null,
    setCategoryListQueryParams: (params: CategoryListRequest) => void,
    setShowingCreateCategoryDrawer: (value: boolean) => void,
    setShowingEditCategoryDrawer: (value: boolean) => void,
    setEditingCategory: (params: CategoryWithParentAndProductCount) => void,
};

export type ColorState = {
    showingCreateColorDrawer: boolean,
    showingEditColorDrawer: boolean,
    colorListQueryParams: ColorListRequest,
    editingColor: Color | null,
    setEditingColor: (value: Color | null) => void,
    showCreateColorDrawer: (value: boolean) => void,
    showEditColorDrawer: (value: boolean) => void,
    setColorListQueryParams: (params: ColorListRequest) => void,
};

export type SizeState = {
    sizeListQueryParams: SizeListRequest,
    editingSize: Size | null,
    showingCreateSizeDrawer: boolean,
    showingEditSizeDrawer: boolean,
    setEditingSize: (value: Size | null) => void,
    showCreateSizeDrawer: (value: boolean) => void,
    showEditSizeDrawer: (value: boolean) => void,
    setSizeListQueryParams: (params: SizeListRequest) => void,
};

export type OrderState = {
    orderListQueryParams: OrderListRequest,
    orderProductList: SavingOrderProduct[],
    showingAddOrderProductDrawer: boolean,
    showingOrderProductListDrawer: boolean,
    selectedOrderProduct: Product | null,
    setOrderListQueryParams: (params: OrderListRequest) => void,
    addOrderProduct: (product: SavingOrderProduct) => void,
    removeOrderProduct: (product_id: SavingOrderProduct['id'], stock_id: SavingOrderProduct["stock"]["id"]) => void,
    showAddOrderProductDrawer: (val: boolean) => void,
    showOrderProductListDrawer: (val: boolean) => void,
    setSelectedOrderProduct: (product: Product | null) => void
}

export type BoundedState = ProductState & CategoryState & ColorState & SizeState & OrderState;