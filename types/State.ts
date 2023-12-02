import { CategoryListRequest } from "@/hooks/queries/category/useGetCategoryList";
import { ProductListRequest } from "@/hooks/queries/product/useGetProductList";
import { CategoryWithParentAndProductCount } from "./Category";
import { Color } from "./Color";
import { ColorListRequest } from "@/hooks/queries/color/useGetColorLists";
import { SizeListRequest } from "@/hooks/queries/size/useGetSizeList";
import { Size } from "./Size";

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
    setColorListQueryParams: (params: ColorListRequest) => void,
    setShowingCreateColorDrawer: (value: boolean) => void,
};

export type SizeState = {
    showingCreateSizeDrawer: boolean,
    showingEditSizeDrawer: boolean,
    sizeListQueryParams: SizeListRequest,
    editingSize: Size | null,
    setSizeListQueryParams: (params: SizeListRequest) => void,
    setShowingCreateSizeDrawer: (value: boolean) => void,
};

export type BoundedState = ProductState & CategoryState & ColorState & SizeState;