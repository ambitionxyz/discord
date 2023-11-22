"use client";

import { useSocket } from "./providers/socket-provider";

const SocketIndicator = () => {
  const { isConnected } = useSocket();
  if (!isConnected) {
    return <div>not connected</div>;
  } else {
    return <div>connected</div>;
  }
};

export default SocketIndicator;
