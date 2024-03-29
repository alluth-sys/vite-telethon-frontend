import { access_token_header } from "@/constants/access_token";
import { BASE } from "@/constants/endpoints";
import { setFriendChatHistory } from "@/states/user/userSlice";
import axios from "axios";

export const getChatHistory = async (
  target_channel_id: number,
  user_id: number | undefined,
  message_id = 0
) => {
  return new Promise(async function (resolve, reject) {
    if (target_channel_id == 0) {
      return;
    }
    await axios
      .get(`${BASE}/getMessage`, {
        params: {
          user_id: user_id,
          channel_id: target_channel_id,
          message_id: message_id,
        },
        headers: access_token_header(),
      })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log(e), reject(e);
      });
  });
};

export const getChatPinnedHistory = async (
  target_channel_id: number,
  user_id: number | undefined,
  message_id: number,
  dispatch: Function,
  limit = -1
) => {
  return new Promise(async function (resolve, reject) {
    if (target_channel_id == 0) {
      return;
    }
    await axios
      .get(`${BASE}/messages`, {
        params: {
          user_id: user_id,
          channel_id: target_channel_id,
          message_id: message_id,
          limit: limit,
        },
        headers: access_token_header(),
      })
      .then((res) => {
        dispatch(setFriendChatHistory(res));
        resolve(res);
      })
      .catch((e) => {
        console.log(e), reject(e);
      });
  });
};

export const getChatPinnedMessage = async (
  target_channel_id: number,
  user_id: number | undefined
) => {
  return new Promise(async function (resolve, reject) {
    if (target_channel_id == 0) {
      return;
    }
    await axios
      .get(`${BASE}/getPinnedMessage`, {
        params: {
          user_id: user_id,
          channel_id: target_channel_id,
        },
        headers: access_token_header(),
      })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log(e), reject(e);
      });
  });
};

export function scrollBarAnimation() {
  var curr = document.getElementById("messageArea");
  if (curr != undefined) {
    curr.className = "scrolling-class grid";
  }
  setTimeout(() => {
    if (curr != undefined) {
      curr!.className = "message-area-scrollbar grid";
    }
  }, 1000);
}

type position = { x: number; y: number };
export function computeDistance(pos1: position, pos2: position) {
  const disX = Math.pow(pos1.x - pos2.x, 2);
  const disY = Math.pow(pos1.y - pos2.y, 2);
  return Math.pow(disX + disY, 1 / 2);
}
