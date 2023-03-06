import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name: "message",
    initialState: {
        gotMessages: false,
        messages: [],
    },
    reducers: {
        getMessages: (state, action) => {
            return {
                ...state,
                gotMessages: true,
                messages: action.payload,
            }
        },
        modifyMessage: (state, action) => {
            return {
                ...state,
                messages: action.payload,
            }
        },
    },
})

export const { getMessages, modifyMessage } = messageSlice.actions;

export default messageSlice.reducer;