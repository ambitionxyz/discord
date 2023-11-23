"use client";

import { Badge } from "@mantine/core";
import { useSocket } from "../providers/socket-provider";

const SocketIndicator = () => {
  const { isConnected } = useSocket();
  if (!isConnected) {
    return <Badge color="teal">online</Badge>;
  } else {
    return <Badge color="red">offline</Badge>;
  }
};

export default SocketIndicator;
