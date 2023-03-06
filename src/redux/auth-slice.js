import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoading: true,
    },
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                user: action.payload,
                isLoading: false,
            }
        },
        logout: (state) => {
            return {
                ...state,
                user: null,
                isLoading: false,
            }
        }
    },
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
