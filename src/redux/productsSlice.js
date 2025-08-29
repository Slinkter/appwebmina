import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    status: "idle",
    error: null,
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload;
            state.status = "succeeded";
            state.error = null;
        },
        setProductsLoading: (state, action) => {
            state.status = "loading";
        },
        setProductsError: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
    },
});

export const { setProducts, setProductsLoading, setProductsError } =
    productsSlice.actions;

export default productsSlice.reducer;

//
