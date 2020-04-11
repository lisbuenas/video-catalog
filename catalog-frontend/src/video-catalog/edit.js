import React, { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";

import api from "services/api";

function VideoEdit({ id, openModal, setOpenModal, listCatalog }) {
  const [videoData, setVideoData] = useState([]);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  useEffect(() => {
    if (id) {
      loadDetail(id);
    } else {
      setVideoData([]);
    }
  }, [openModal, id]);

  async function loadDetail() {
    try {
      let res = await api.get("videos/" + id);
      setVideoData(res.data);
    } catch (err) {}
  }

  async function saveDetail() {
    if (id) {
      try {
        await api.put("videos/" + id, videoData);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await api.post("videos", videoData);
      } catch (err) {
        console.log(err);
      }
    }
    setOpenModal(false);
  }

  async function removeVideo() {
    try {
      await api.delete("videos/" + id);
    } catch (err) {
      console.log(err);
    } finally {
      setOpenRemoveModal(false);
      listCatalog();
      setOpenModal(false);
    }
  }

  return (
    <>
      <Dialog open={openRemoveModal}>
        <DialogTitle id="about-movie-dialog">
          Remove movie from catalog?
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setOpenRemoveModal(false)}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => removeVideo()}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openModal} aria-labelledby="about-movie-dialog">
        <DialogTitle id="about-movie-dialog">
          About movie{" "}
          <Button onClick={() => setOpenRemoveModal(true)}>Remove</Button>
        </DialogTitle>
        <DialogContent>
          <TextField
            value={videoData.Title || ""}
            label="Title"
            onChange={({ target: { value } }) => {
              setVideoData((prev) => ({ ...prev, Title: value }));
            }}
            fullWidth
          />
          <TextField
            value={videoData.genre || ""}
            label="Genre"
            onChange={({ target: { value } }) => {
              setVideoData((prev) => ({ ...prev, Genre: value }));
            }}
            fullWidth
          />
          <TextField
            value={videoData.Released || ""}
            label="Released"
            onChange={({ target: { value } }) => {
              setVideoData((prev) => ({ ...prev, Released: value }));
            }}
            fullWidth
          />
          <TextField
            value={videoData.Actors || ""}
            label="Actors"
            onChange={({ target: { value } }) => {
              setVideoData((prev) => ({ ...prev, Actors: value }));
            }}
            fullWidth
          />

          <TextField
            value={videoData.Plot || ""}
            label="Plot"
            onChange={({ target: { value } }) => {
              setVideoData((prev) => ({ ...prev, Plot: value }));
            }}
            fullWidth
          />
          <TextField
            value={videoData.youtubeTrailer || ""}
            label="Youtube Trailer"
            onChange={({ target: { value } }) => {
              setVideoData((prev) => ({ ...prev, youtubeTrailer: value }));
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => saveDetail()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default VideoEdit;
