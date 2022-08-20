import React from "react";
import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { Button } from "@mui/material";
import { SocketContext } from "@/service/Socket";
import { useAppDispatch } from "@/app/hooks";
import { setUserFriendList } from "@/states/user/userSlice";
import io from "socket.io-client";
import { Socket } from "socket.io-client";

export default function Home() {
  const socket = React.useContext(SocketContext);
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.user);

  React.useEffect(() => {
    console.log("use Effect")
    if(socket!==null){
    socket.on("initial", (res) => {
      dispatch(setUserFriendList(res));
    });
    socket.off('message').on('message', msg=>console.log(msg));
  }
  }, []);

  return (
    <div className="w-full">
      <div>home</div>
      <Button
        onClick={() => {
          socket.emit("ping");
          socket.emit("conn", data.id);
        }}
      >
        test
      </Button>
    </div>
  );
}
