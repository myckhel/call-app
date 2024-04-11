import { useDispatch } from "react-redux";
import useState from "use-react-state";
import { logoutUser } from "./store/auth";
import { useRootMemoSelector } from "use-redux-states";

export default function Call() {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(logoutUser());
  const user = useRootMemoSelector("auth.user");

  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name}</h1>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={onLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
        <OnlineUsers />
      </div>
    </div>
  );
}

const OnlineUsers = () => {
  const [{ users }, setState] = useState({
    users: [
      { name: "User 1", email: "user1@email.com", id: 1 },
      { name: "User 2", email: "user2@email.com", id: 2 },
    ],
  });

  const onCallUser = (id) => {
    // Add your call user logic here
    console.log("Calling user with id:", id);
  };

  return (
    <div>
      {users?.map(({ name, id }, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b py-2"
        >
          <p>{name}</p>
          <span className="bg-green-500 rounded-full h-2 w-2 block mx-2"></span>
          <button
            onClick={() => onCallUser(id)}
            className="bg-blue-500 ml-8 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Call
          </button>
        </div>
      ))}
    </div>
  );
};
