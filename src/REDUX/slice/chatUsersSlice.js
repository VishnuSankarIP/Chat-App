import { createSlice } from "@reduxjs/toolkit";

const chatUsersSlice=createSlice({
    name:"chat",
    initialState:[]
    ,
  reducers: {
    setChat: (state, action) => {
      state.push(action.payload);
    }
}
    
});
export const {setChat}=chatUsersSlice.actions  
export default chatUsersSlice.reducer;