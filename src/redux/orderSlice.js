import { createSlice } from "@reduxjs/toolkit";
import reducer from "./authSlice";

const initialState = {
    selectedEmployer: null,
    items: [],
};

export const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {
        setOrderEmployer: (state, action) => {},
        addItemToOrder: (state, action) => {},
        removeItemFromOrder: (state, action) => {},
        clearOrder: (state, action) => {},
    },
});

export const {setOrderEmployer,addItemToOrder,removeItemFromOrder,clearOrder} = orderSlice.actions;

export default orderSlice.reducer;

//