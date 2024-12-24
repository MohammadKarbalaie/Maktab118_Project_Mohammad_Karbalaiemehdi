// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
}

const initialState: UserState = {
  firstname: '',
  lastname: '',
  username: '',
  phoneNumber: '',
  address: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.username = action.payload.username;
      state.phoneNumber = action.payload.phoneNumber;
      state.address = action.payload.address;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
