import React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    width: "10%",
    height: "10%",
    borderRadius: "50%",
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

type TProps = {
  uid: string | undefined;
  imgSrc: string;
  width: number;
  height: number;
  simple?: boolean;
};

export default function ProfilePicture({
  uid,
  imgSrc,
  width,
  height,
  simple = false,
}: TProps) {
  return (
    <>
      {(!simple && (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            alt={uid}
            src={imgSrc}
            sx={{ width: width, height: height }}
          />
        </StyledBadge>
      )) || (
        <Avatar alt={uid} src={imgSrc} sx={{ width: width, height: height }} />
      )}
    </>
  );
}
