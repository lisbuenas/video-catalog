import React, { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";

import axios from "axios";

let user = JSON.parse(localStorage.getItem("token"));
const token = user && user.token;

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
      let res = await axios.get("videos/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideoData(res.data);
    } catch (err) {}
  }

  async function saveDetail() {
    if (id) {
      try {
        await axios.put("videos/" + id, videoData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.post("videos", videoData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.log(err);
      }
    }
    setOpenModal(false);
    listCatalog();
  }

  async function removeVideo() {
    try {
      await axios.delete("videos/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setOpenRemoveModal(false);
      listCatalog("");
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
          <Button color="secondary" onClick={() => setOpenRemoveModal(false)}>
            Cancel
          </Button>
          <Button
            color="secondary"
            id="confirm-remove"
            onClick={() => removeVideo()}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openModal} aria-labelledby="about-movie-dialog">
        <DialogTitle id="about-movie-dialog">
          About movie{" "}
          <Button onClick={() => setOpenRemoveModal(true)} id="remove-button">
            Remove
          </Button>
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
          <Button color="secondary" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button color="secondary" onClick={() => saveDetail()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default VideoEdit;
