// import { Socket } from "socket.io-client";

interface ISocketEventHandler<T = any> {
  (...args: T[]): void;
}

export const useIOEvent = <T = any>(
  e: string,
  handle: ISocketEventHandler<T>
) => {
  const { $socket } = useNuxtApp();
  $socket?.on(e, handle);
  onUnmounted(() => $socket?.off(e, handle));
};
