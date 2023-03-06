import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import messageReducer from './message-slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        message: messageReducer,
    },
});