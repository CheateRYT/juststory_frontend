import { backendApiUrl } from "@/src/utils/backendApiUrl";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
interface UserState {
  user: null | { login: string };
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk<
  { login: string },
  { login: string; password: string }
>("user/register", async (userData) => {
  const response = await axios.post(`${backendApiUrl}/user/register`, userData);
  return response.data;
});

export const loginUser = createAsyncThunk<
  { login: string },
  { login: string; password: string }
>("user/login", async (userData) => {
  const response = await axios.post(`${backendApiUrl}/user/login`, userData);
  Cookies.set("token", response.data.token);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка регистрации";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Вы ввели неправильные данные!";
      });
  },
});

export default userSlice.reducer;
