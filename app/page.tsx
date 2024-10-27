"use client"
import { Provider } from "react-redux";
import { ReduxForm } from "./components/reduxForm/ReduxForm";
import { store } from "./components/store";

export default function Home() {
  return (
    <Provider store={store}>
    <ReduxForm/>
  </Provider>
  );
}
