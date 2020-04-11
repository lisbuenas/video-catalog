import React from "react";

import ReactPlayer from "react-player";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";

function Player({ setOpenPlayerModal, saveDetail, openPlayerModal }) {
  return (
    <Dialog open={openPlayerModal} aria-labelledby="player-movie-dialog">
      <DialogTitle id="about-movie-dialog">
        About movie <Button>Remove</Button>
      </DialogTitle>
      <DialogContent>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          playing
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setOpenPlayerModal(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Player;
