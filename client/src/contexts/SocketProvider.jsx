import React, { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const socketContext = createContext;

export function useSocket() {
  return useContext(socketContext);
}

export const SocketProvider = ({ id, children }) => {
  const [socket, setSocket] = useState(undefined);

  useEffect(() => {
    const newSocket = io("https://localhost:5000", {
      query: { id },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};
