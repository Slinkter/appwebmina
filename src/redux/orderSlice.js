import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedEmployer: null,
    items: [],
};

export const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {
        setOrderEmployer: (state, action) => {
            state.selectedEmployer =action.payload
        },
        addItemToOrder: (state, action) => {
            state.items.push(action.payload)
        },
        removeItemFromOrder: (state, action) => {
            state.items = state.items.filter(item=> item.id !== action.payload.docId)
        },
        clearOrder: (state, action) => {
            state.items = [];
            state.selectedEmployer = null;
        },
    },
});

export const {setOrderEmployer,addItemToOrder,removeItemFromOrder,clearOrder} = orderSlice.actions;

export default orderSlice.reducer;

//