import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import productsReducer from "../redux/productsSlice";
import employersReducer from "../redux/employersSlice";
import orderReducer from "../redux/orderSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        employers:employersReducer,
        order:orderReducer
    },
});
