import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: "user",
    initialState:{
        userId: null,
        username: "",
    },
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload;
            state.username = action.payload;
        },
        logout: (state) => {
            state.userId = null;
            state.username = "";
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

