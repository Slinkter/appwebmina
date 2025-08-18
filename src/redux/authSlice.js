import { createSlice } from "@reduxjs/toolkit";
const initialState = { user: null, status: "loading" };

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user= action.payload;
            state.status= 'authenticated'
        },
        clearUser: (state, action) => {
            state.user= null;
            state.status= 'unauthenticated'
        },
        setAuthLoading: (state, action) => {
            state.status='loading'
        },
    },
});

export const { setUser, clearUser, setAuthLoading } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
    
export default authSlice.reducer;
