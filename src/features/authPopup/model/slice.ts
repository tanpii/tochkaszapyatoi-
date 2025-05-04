import {RootState} from '@/app/store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthorizationState {
    isOpen: boolean;
    isAuthorized: boolean;
}

const initialState: AuthorizationState = {
    isOpen: false,
    isAuthorized: false,
};

export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        openAuthPopup(state) {
            state.isOpen = true;
        },
        closeAuthPopup(state) {
            state.isOpen = false;
        },
        setIsAuthorized(state, action: PayloadAction<boolean>) {
            state.isAuthorized = action.payload;
        },
    },
});

export const {openAuthPopup, closeAuthPopup, setIsAuthorized} = authorizationSlice.actions;

export const getIsAuthPopupOpen = (state: RootState) => state.authorization.isOpen;

export const getUserAuthorized = (state: RootState) => state.authorization.isAuthorized;

export default authorizationSlice.reducer;
