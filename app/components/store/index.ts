import { configureStore } from '@reduxjs/toolkit';
import formReducer, { loadFormData } from './formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

// Load initial data from localStorage
const storedData = localStorage.getItem('formData');
if (storedData) {
  const parsedData = JSON.parse(storedData);
  store.dispatch(loadFormData(parsedData)); // Load data into Redux state
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

