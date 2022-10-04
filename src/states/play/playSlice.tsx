import {
  createSlice,
  PayloadAction,
  current,
  Dictionary,
} from "@reduxjs/toolkit";

export interface IData {
  id: number;
  username: string;
  access_hash: number;
  first_name: string;
  last_name: string;
  phone: string;
  profile_pic: string;
}

export interface IUser {
  isLogin: boolean;
  data: IData | null;
  friendList: FriendList;
  timeList: Array<Friend>;
  timeListIndex: number;
  focus: number;
  showContextMenu: boolean;
  contextMenuAnchorPoint: Dictionary<number>;
  dummy_testing: number;
}

export type Message = {
  tag: string;
  channel: number;
  from: string;
  sender_id: number;
  data: string;
  message_id: number;
  timestamp: string;
};

export type Friend = {
  channel_id: number;
  username: string;
  profile_b64: string;
  unread_count: number;
  last_message: Message | null;
  chat_history: Dictionary<Message>;
  oldest_message_id: number;
  priority: number;
  initialized_chat: Boolean;
};

export type FriendList = {
  [id: number]: Friend;
};

const initialState: IUser = {
  isLogin: false,
  data: null,
  friendList: {
    0: {
      channel_id: 0,
      username: "-1",
      profile_b64: "-1",
      unread_count: -1,
      last_message: null,
      chat_history: {
        "0": {
          tag: "null",
          channel: -1,
          from: "null",
          sender_id: -1,
          data: "null",
          message_id: -1,
          timestamp: "null",
        },
      },
      oldest_message_id: -1,
      priority: -1,
      initialized_chat: false,
    },
  },
  timeList: [],
  timeListIndex: 0,
  focus: 0,
  showContextMenu: false,
  contextMenuAnchorPoint: { x: 0, y: 0 },
  dummy_testing: 10,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAuthedp: (state: IUser, action) => {
      state.isLogin = true;
      state.data = action.payload;
      return state;
    },
    setUserLoggedOutp: (state: IUser) => {
      state.isLogin = false;
      return state;
    },
    setUserFriendListp: (state: IUser, action) => {
      // console.log("set user friend list");
      let friend: Friend = {
        channel_id: action.payload.channel,
        username: action.payload.name,
        profile_b64: action.payload.b64,
        unread_count: action.payload.unread_count,
        last_message: action.payload.last_message,
        chat_history: {},
        oldest_message_id: 0,
        priority: action.payload.priority,
        initialized_chat: false,
      };
      state.friendList[action.payload.channel] = friend;

      state.timeList[state.timeListIndex] = friend;
      state.timeListIndex++;

      return state;
    },
    setFriendLatestMessagep: (state: IUser, action) => {
      console.log("incoming msg", action.payload);
      if (action.payload.data.context !== undefined) {
        action.payload = action.payload.data.context;
      }
      // get the channel id of the incoming message
      const index = state.timeList.findIndex(
        (element) => element.channel_id == action.payload.channel
      );

      // send back the priority of the messages' timestamp
      const timeList0 = state.timeList[index];
      for (let i = index; i > 0; i--) {
        state.timeList[i] = state.timeList[i - 1];
      }
      // set the incoming message as top
      timeList0.last_message = action.payload;
      state.timeList[0] = timeList0;

      // append in chat history
      const channel: number = action.payload.channel;
      const message_id: number = action.payload.message_id;
      state.friendList[channel].chat_history[message_id] = action.payload;

      // update the latest message
      state.friendList[action.payload.channel].last_message =
        action.payload.data;

      return state;
    },
    setFriendChatHistoryp: (state: IUser, action) => {
      // append in chat history
      for (let i = 0; i < action.payload.data.context.length; i++) {
        const newhistory = {
          ...state.friendList[action.payload.data.context[0].channel]
            .chat_history,
          [action.payload.data.context[i].message_id]:
            action.payload.data.context[i],
        };
        state.friendList[action.payload.data.context[0].channel].chat_history =
          newhistory;
        if (i == action.payload.data.context.length - 1) {
          state.friendList[
            action.payload.data.context[0].channel
          ].oldest_message_id = action.payload.data.context[i].message_id;
        }
      }

      return state;
    },
    setUserFocusp: (state: IUser, action) => {
      state.focus = action.payload;
      return state;
    },
    setUserFreindListInitializedp: (state, { payload }) => {
      state.friendList[payload].initialized_chat = true;
      return state;
    },
    setUserShowContextMenup: (state, action) => {
      state.showContextMenu = action.payload;
      return state;
    },
    setUserContextMenuAnchorPointp: (state, action) => {
      state.contextMenuAnchorPoint.x = action.payload.x;
      state.contextMenuAnchorPoint.y = action.payload.y;
      return state;
    },
    setDummyTestingp: (state) => {
      console.log("set dummy testing to", state.dummy_testing + 1);
      state.dummy_testing = state.dummy_testing + 1;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserAuthedp,
  setUserLoggedOutp,
  setUserFriendListp,
  setFriendLatestMessagep,
  setFriendChatHistoryp,
  setUserFocusp,
  setUserFreindListInitializedp,
  setUserShowContextMenup,
  setUserContextMenuAnchorPointp,
  setDummyTestingp,
} = userSlice.actions;

export default userSlice.reducer;