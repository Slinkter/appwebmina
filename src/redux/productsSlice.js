import { errorPrefix } from "@firebase/util";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items:[],
    status:'idle',
    error:null
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {},
        setProductsLoading: (state, action) => {},
        setProductsError: (state, action) => {},
    },
});

export const {setProducts,setProductsLoading,setProductsError}= productsSlice.actions;

export default productsSlice.reducer;

//