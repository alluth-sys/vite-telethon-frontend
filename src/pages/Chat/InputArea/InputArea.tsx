import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import "./InputArea.css";
import InputEmoji from "react-input-emoji";
import { useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setFriendLatestMessage } from "@/states/user/userSlice";
import VoiceInput from "./VoiceInput/VoiceInput";
import { BASE } from "@/constants/endpoints";

export default function InputArea() {
  // state need to be organized :
  //  select:
  //    userid
  //  select:
  //    channel_id
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(true);
  const { data, focus } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  function handleOnEnter() {
    if (text.length <= 0) {
      return;
    }
    axios
      .post(`${BASE}/send`, {
        user_id: data!.id,
        channel_id: focus,
        message: text,
      })
      .then((response) => dispatch(setFriendLatestMessage(response)))
      .catch((error) => console.log(error));
  }

  function uploadFile(formData: FormData, user_id: number, channel_id: number) {
    axios
      .post(`${BASE}/sendFile`, formData, {
        params: {
          user_id,
          channel_id,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        dispatch(setFriendLatestMessage(response));
      })
      .catch((error) => console.log(error));
  }

  function importD() {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (_this) => {
      var file = new FormData();
      file.append("file", input!.files![0]);
      uploadFile(file, data!.id, focus);
    };
    input.click();
  }

  return (
    <>
      <div className="grid grow ">
        <hr className="border-black border-t-4" />

        <div
          className="flex  content-center "
          style={{ width: "70%", justifySelf: "center" }}
        >
          <AddPhotoAlternateIcon
            className="my-8 mx-5 navigate"
            onClick={importD}
          />
          <InputEmoji
            value={text}
            onChange={setText}
            cleanOnEnter
            onEnter={handleOnEnter}
          />
          <SendIcon className="my-8 mx-5 navigate" onClick={handleOnEnter} />
          <VoiceInput />
        </div>
      </div>
    </>
  );
}
