import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { scrollBarAnimation } from "../MessageArea/helpers";

const setStyle = (dis: boolean, style: object) => {
  return {
    visibility: dis ? "visible" : "hidden",
    ...style,
  };
};

const scrollToBot = () => {
  const messageArea = document.getElementById("messageArea");
  messageArea!.scrollTop =
    messageArea!.scrollHeight - messageArea!.clientHeight + 1;
  scrollBarAnimation();
};

export default function ScrollButton({ display }: any) {
  return (
    <div
      //@ts-ignore
      style={setStyle(display, {
        position: "absolute",
        bottom: 160,
        right: 100,
        backgroundColor: "black",
        borderRadius: "50px",
      })}
      onClick={scrollToBot}
    >
      <ArrowDownwardIcon
        style={{ cursor: "pointer", color: "white", margin: "10 10 10 10 " }}
      />
    </div>
  );
}
