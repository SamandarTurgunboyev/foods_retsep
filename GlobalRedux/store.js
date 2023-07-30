"use client"

import addSlice from "../slice/addSlice";
import categorySlice from "../slice/categorySlice";
import foodSlice from "../slice/foodSlice";
import foodNameSlice from "../slice/foodNameSlice";
import italianSlice from "../slice/italianSlice";
import meelsSlice from "../slice/meelsSlice";
import searchSlice from "../slice/serachSlice";
import searchFoodSlice from "../slice/searchFoodSlice";
import { configureStore } from "@reduxjs/toolkit";

export function makestore() {
    return configureStore({
        reducer: {
            category: categorySlice,
            italian: italianSlice,
            meels: meelsSlice,
            addFavourites: addSlice,
            foods: foodSlice,
            foodName: foodNameSlice,
            search: searchSlice,
            searchFood: searchFoodSlice,
        }
    })
}

export const store = makestore()