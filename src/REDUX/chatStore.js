import { configureStore } from "@reduxjs/toolkit";
import chatUsersSlice from "./slice/chatUsersSlice";

const chatStore=configureStore({


    reducer:{
        chatUsersReducer: chatUsersSlice
    }

})
export default chatStore