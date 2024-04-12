import "./App.css";
import Call from "./Call";
import Login from "./Login";
import { useRootMemoSelector } from "use-redux-states";
import { Provider } from "react-redux";
import store from "./store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const user = useRootMemoSelector("auth.user");

  return <div>{user ? <Call /> : <Login />}</div>;
}

const Root = () => (
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);
export default Root;
