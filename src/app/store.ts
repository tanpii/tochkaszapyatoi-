import type {Action, ThunkAction} from '@reduxjs/toolkit';
import {configureStore} from '@reduxjs/toolkit';
import {themeSlice} from '@/entities/theme';
import {booksFilterSlice} from '@/features/booksFilter/model/slice';
import {authorizationSlice} from '@/features/authPopup';

export const store = configureStore({
    reducer: {
        theme: themeSlice.reducer,
        booksFilter: booksFilterSlice.reducer,
        authorization: authorizationSlice.reducer,
    },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>;
