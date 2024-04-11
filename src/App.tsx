import useState from "use-react-state";
import "./App.css";
import Call from "./Call";
import Login from "./Login";
import { useRootMemoSelector } from "use-redux-states";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  // const [{user}, setState] = useState({ user: undefined });
  const user = useRootMemoSelector("auth.user");
  console.log({ user });

  return <div>{user ? <Call /> : <Login />}</div>;
}

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
export default Root;
