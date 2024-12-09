// src/store/subscriptionSlice.ts
import { backendApiUrl } from "@/src/utils/backendApiUrl";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
interface SubscriptionState {
  subscription: null | {
    id: number;
    name: string;
    price: string;
    daysPeriod: number;
    description: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscription: null,
  loading: false,
  error: null,
};

export const updateSubscription = createAsyncThunk<
  void,
  { id: number; data: Partial<Subscription> }
>("subscription/update", async ({ id, data }) => {
  const token = Cookies.get("token"); // Получаем токен из localStorage
  await axios.post(`${backendApiUrl}/subscription/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubscription.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка обновления подписки";
      });
  },
});

export default subscriptionSlice.reducer;
