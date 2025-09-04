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
            state.selectedEmployer = action.payload;
        },
        addItemToOrder: (state, action) => {
            const newItem = action.payload;
            const isCheckItem = state.items.findIndex(
                (item) => item.docId === newItem.docId
            );
            if (isCheckItem !== -1) {
                state.items[isCheckItem].quantity += newItem.quantity;
            } else {
                state.items.push(newItem);
            }
        },
        removeItemFromOrder: (state, action) => {
            state.items = state.items.filter(
                (item) => item.docId !== action.payload
            );
        },
        clearOrder: (state, action) => {
            state.items = [];
            state.selectedEmployer = null;
        },
    },
});

export const {
    setOrderEmployer,
    addItemToOrder,
    removeItemFromOrder,
    clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;

//
