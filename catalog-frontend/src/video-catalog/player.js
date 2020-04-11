import React from "react";

import ReactPlayer from "react-player";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Slide,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import styled from "styled-components";

const StyledDialog = styled(Dialog)`
  .MuiBackdrop-root {
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: url(filters.svg#filter) blur(4px) saturate(150%);
    box-shadow: none;
  }
`;

function Player({ setOpenPlayerModal, openPlayerModal, videoData }) {
  let data = videoData;

  return (
    <>
      <StyledDialog
        open={openPlayerModal}
        aria-labelledby="player-movie-dialog"
        maxWidth="md"
        style={{ backgroundColor: "none", boxShadow: "none" }}
        overlayStyle={{ backgroundColor: "transparent" }}
        fullWidth
        elevation={0}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        shadow={0}
      >
        <DialogTitle id="about-movie-dialog">
          {(data && data.Title) || "Video"}
          <Button
            style={{ float: "right", marginRight: "125px" }}
            color="contrast"
            onClick={() => setOpenPlayerModal(false)}
          >
            <CancelIcon />
          </Button>
        </DialogTitle>
        <DialogContent
          elevation={0}
          style={{
            height: "60vh",
            backgroundColor: "transparent",
            boxShadow: "none",
            marginRight: "125px",
          }}
        >
          <ReactPlayer
            width="100%"
            height="100%"
            style={{ width: "60vh" }}
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            playing
          />
        </DialogContent>
      </StyledDialog>

      <Dialog
        open={openPlayerModal}
        aria-labelledby="about-movie-dialog"
        hideBackdrop={true}
        disableBackdropClick={true}
        style={{
          height: "auto",
          width: "auto",
          right: "auto",
          bottom: "0",
          top: "0",
          left: "0",
        }}
        PaperProps={{
          style: {
            backgroundColor: "#E0DBD5",
            boxShadow: "none",
          },
        }}
      >
        <DialogContent
          style={{
            height: "100%",
            position: "fixed",
            right: 0,
            top: 0,
            width: "220px",
            backgroundColor: "#E0DBD5",
            boxShadow: "none",
          }}
        ></DialogContent>
      </Dialog>
    </>
  );
}

export default Player;
