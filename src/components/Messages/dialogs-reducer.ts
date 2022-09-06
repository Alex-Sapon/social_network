import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {dialogsAPI, IAllDialogs} from '../../api/apiDialogs';
import {AxiosError} from 'axios';

export const fetchDialogs = createAsyncThunk<{ dialogs: IAllDialogs[] }, void, { rejectValue: string }>('dialogs/fetchDialogs', async (_, {
    rejectWithValue
}) => {
    try {
        const res = await dialogsAPI.getDialogs();
        return {dialogs: res.data};
    } catch (e) {
        return rejectWithValue((e as AxiosError).message);
    }
})

export const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState: {
        users: [],
        dialogs: [],
        isLoading: false
    } as DialogsStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchDialogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDialogs.fulfilled, (state, action) => {
                state.dialogs = action.payload.dialogs;
                state.isLoading = false;
            })
    }
})

export const dialogsReducer = dialogsSlice.reducer;
export const dialogsAsyncActions = {fetchDialogs};

export type UserType = {
    id: string
    name: string
};

export type MessageType = {
    id: string
    message: string
};

export type DialogsStateType = {
    users: UserType[]
    dialogs: IAllDialogs[]
    isLoading: boolean
};