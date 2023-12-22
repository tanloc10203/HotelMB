import { socket } from "@/services/socket";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

const useSocket = () => {
  const [socketClient, setSocket] = useState<Socket>(socket);

  useEffect(() => {
    socket.connect();
    socket.on("connect_error", (e) => {
      console.log(`connect_error`, e);
    });

    setSocket(socket);

    return () => {
      socket.off("connect_error");
    };
  }, []);

  return socketClient!;
};

export default useSocket;
