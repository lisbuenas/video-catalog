import React from "react";
import { Dialog } from "@material-ui/core";

function DetailsPlayer() {
  return (
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
      >
        {(data && data.Title) || "Video"}

        {(data && data.Actors) || "Actors"}

        {(data && data.Released) || "Released"}
      </DialogContent>
    </Dialog>
  );
}

export default DetailsPlayer;
