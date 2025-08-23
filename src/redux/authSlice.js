import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, status: "loading" },
    reducers: {
        setAuthLoading: (state, action) => {
            state.status = "loading";
        },
        clearUser: (state, action) => {
            state.user = null;
            state.status = "unauthenticated";
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.status = "authenticated";
        },
    },
});
// useSelector
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;

export const { setUser, clearUser, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
