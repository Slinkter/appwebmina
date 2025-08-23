import { createSlice } from "@reduxjs/toolkit";


const initialState={
    items:[],
    status:'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error:null
}

export const employerSlice = createSlice({
    name: "employers",
    initialState: initialState,
    reducers: {
        setEmployer: (state, action) => {
            state.items = action.payload;
            state.status = "succeded";
        },
        setEmployerLoading: (state, action) => {
            state.status = "loading";
        },
        setEmployerError: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
    },
});

export const {setEmployer,setEmployerLoading,setEmployerError} = employerSlice.actions;
export const selectEmployers = (state) => state.employers.items;
export const selectEmployersStatus = (state) => state.employers.status;
export const selectEmployersError = (state) => state.employers.error;
export default employerSlice.reducer;