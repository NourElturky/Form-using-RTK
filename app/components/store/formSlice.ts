import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin" | "superadmin";
  agreeToTerms: boolean;
}

const initialState: FormData = {
  username: '',
  email: '',
  password: '',
  role: 'user',
  agreeToTerms: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      return { ...state, ...action.payload };
    },
    loadFormData: (state, action: PayloadAction<FormData>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setFormData, loadFormData } = formSlice.actions;
export default formSlice.reducer;
