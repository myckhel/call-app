import { useRootMemoSelector } from "use-redux-states";
import { User } from "./Call";
import { useEffect, useRef } from "react";
import CallManager from "./utils/CallManager";

export default function Calling() {
  const otherUserId = useRootMemoSelector("call.otherUserId");
  const otherUser = useRootMemoSelector("app.users.onlines", (users: User[]) =>
    users.find(({ id }) => id === otherUserId)
  );

  const onEndCall = () => CallManager.endCall();
  const onRef = (video) => CallManager.createMedia({ video });

  useEffect(() => {
    // Access the user's webcam and display it in the video element
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => CallManager.addStreamToMedia("video", stream))
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });

    // Cleanup function to stop the video stream when the component unmounts
    return () => {
      CallManager.stopMediaTracks();
    };
  }, []);

  return (
    <div className="relative">
      <div>
        Calling {otherUser?.name}({otherUser.email}) with id: {otherUserId}
      </div>
      <video
        ref={onRef}
        className="w-full max-w-sm max-h-full"
        autoPlay
        playsInline
        muted // Mute the video to prevent feedback
      ></video>
      <button
        onClick={onEndCall}
        className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        End Call
      </button>
    </div>
  );
}
