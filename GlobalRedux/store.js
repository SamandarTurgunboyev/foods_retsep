"use client"

import addSlice from "../slice/addSlice";
import categorySlice from "../slice/categorySlice";
import foodSlice from "../slice/foodSlice";
import italianSlice from "../slice/italianSlice";
import meelsSlice from "../slice/meelsSlice";
import { configureStore } from "@reduxjs/toolkit";

export function makestore() {
    return configureStore({
        reducer: {
            category: categorySlice,
            italian: italianSlice,
            meels: meelsSlice,
            addFavourite: addSlice,
            foods: foodSlice
        }
    })
}

export const store = makestore()