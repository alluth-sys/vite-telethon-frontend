import { useAppDispatch, useAppSelector } from "@/app/hooks";
import axios from "axios";
import { BASE } from "@/constants/endpoints";
import { removeImportantMessages } from "@/states/user/userSlice";
import { access_token_header } from "@/constants/access_token";

const removeImportantMessage = async (
  dispatch: Function,
  message_id: number,
  user_id: number,
  channel_id: number
) => {
  await axios
    .delete(`${BASE}/channel/important_msg/${user_id}`, {
      data: {
        channel_id: channel_id,
        important_msg_id: message_id,
      },
      headers: access_token_header(),
    })
    .then((res) => {
      dispatch(
        removeImportantMessages({ message_id: `${channel_id}_${message_id}` })
      );
    })
    .catch((e) => console.log(e));
};

export default function BulletinContextMenu() {
  const contextMenuAnchorPoint = useAppSelector(
    (state) => state.user.contextMenuAnchorPoint
  );

  const dispatch = useAppDispatch();
  const selectedMessageId = useAppSelector(
    (state) => state.user.selectedMessageId
  );

  let selectedMessageChannel: number;
  let selectedMessageIdInChannel: number;
  let selectedMessageContent: string | undefined;

  if (selectedMessageId != undefined) {
    selectedMessageChannel = parseInt(selectedMessageId[0].split("_")[0]);
    selectedMessageIdInChannel = parseInt(selectedMessageId[0].split("_")[1]);

    selectedMessageContent = useAppSelector(
      (state) =>
        state.user.friendList[selectedMessageChannel].chat_history[
          selectedMessageIdInChannel
        ]?.content
    );
  }
  const user_id = useAppSelector((state) => state.user.data!.id);

  return (
    <ul
      style={{
        position: "absolute",
        top: contextMenuAnchorPoint.y,
        left: contextMenuAnchorPoint.x,
        backgroundColor: "#d0e3e2",
        minWidth: "200px",
        zIndex: 3,
      }}
      id="ContextMenu"
    >
      <li
        onClick={() => {
          if (selectedMessageContent != undefined) {
            navigator.clipboard.writeText(selectedMessageContent);
          }
        }}
      >
        Copy
      </li>
      <li
        onClick={() => {
          removeImportantMessage(
            dispatch,
            selectedMessageIdInChannel,
            user_id,
            selectedMessageChannel
          );
        }}
      >
        <a>Remove from important message</a>
      </li>
    </ul>
  );
}
