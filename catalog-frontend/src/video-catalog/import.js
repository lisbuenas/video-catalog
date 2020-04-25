import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Input,
} from "@material-ui/core";
import styled from "styled-components";

import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import Skeleton from "@material-ui/lab/Skeleton";
import PerfectScrollbar from "react-perfect-scrollbar";
import environment from "environment";
import axios from "axios";

import "react-perfect-scrollbar/dist/css/styles.css";
import CardImport from "./card-import";

const StyledDialog = styled(Dialog)`
  .MuiBackdrop-root {
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: url(filters.svg#filter) blur(4px) saturate(150%);
  }
`;
let user = JSON.parse(localStorage.getItem("token"));
const token = user && user.token;

function VideoImport({ listCatalog, id, openImportModal, setOpenImportModal }) {
  const [search, setSearch] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(false);

  async function searchVideo(e = null) {
    e && e.preventDefault();

    setSearching(true);
    try {
      let res = await axios.get(
        `https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?i=tt3896198&apikey=149aa91b&s=${search}`
      );
      if (res.data.Search) setVideoList(res.data.Search);
    } catch (err) {
      console.log(err);
    } finally {
      setSearching(false);
    }
  }

  async function searchById(imdbID) {
    setSearching(true);
    try {
      let res = await axios.get(
        `https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?apikey=149aa91b&i=${imdbID}`
      );
      if (res.data) setVideoData(res.data);
      setSelectedMovie(true);
    } catch (err) {
      console.log(err);
    } finally {
      setSearching(false);
    }
  }

  async function saveDetail() {
    if (id) {
      try {
        await api.put(`videos/${id}`, { ...videoData });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.post(
          `${environment.BASE_URL}videos`,
          { ...videoData },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
    listCatalog("");
    setOpenImportModal(false);
  }

  return (
    <StyledDialog
      open={openImportModal}
      aria-labelledby="about-movie-dialog"
      maxWidth="lg"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: "rgba(0,0,0,0.6)",
          boxShadow: "none",
        },
      }}
    >
      <DialogTitle id="about-movie-dialog">
        <Typography variant="h7" component="h7" color="primary">
          Add movie
        </Typography>
      </DialogTitle>
      <DialogContent style={{ height: "60vh" }}>
        <Grid container>
          <Grid item xs={4}>
            <form onSubmit={searchVideo}>
              <TextField
                label="Type title"
                name="search-field-import"
                value={search || ""}
                disabled={searching}
                style={{
                  backgroundColor: "rgba(255,255,255,0.6)",
                  padding: "10px",
                }}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                color="primary"
                id="search-movie"
                disabled={searching}
                onClick={() => searchVideo()}
              >
                Search
              </Button>
            </form>

            <div
              style={{
                position: "absolute",
                width: "30%",
                height: "60%",
                overflow: "auto",
              }}
            >
              <PerfectScrollbar>
                {videoList.map((el, index) => (
                  <div className="result-movie-card" key={index}>
                    <CardImport movie={el} searchById={searchById} />
                  </div>
                ))}
              </PerfectScrollbar>
            </div>
          </Grid>

          <Grid item xs={8}>
            <Grid container>
              {searching && <Skeleton width={"100%"} height={500} />}
              {selectedMovie && (
                <Grid item md={8} s={2}>
                  <Fade in={!searching}>
                    <Paper elevation={0} style={{ padding: "20px" }}>
                      <Input
                        value={videoData.Title || ""}
                        label="Title"
                        onChange={({ target: { value } }) => {
                          setVideoData((prev) => ({ ...prev, title: value }));
                        }}
                        fullWidth
                      />

                      <TextField
                        value={videoData.Genre || ""}
                        label="Genre"
                        onChange={({ target: { value } }) => {
                          setVideoData((prev) => ({ ...prev, Genre: value }));
                        }}
                        fullWidth
                      />

                      <TextField
                        value={videoData.Released || ""}
                        label="Release date"
                        onChange={({ target: { value } }) => {
                          setVideoData((prev) => ({
                            ...prev,
                            Released: value,
                          }));
                        }}
                        fullWidth
                      />

                      <TextField
                        value={videoData.Actors || ""}
                        label="Main actors"
                        onChange={({ target: { value } }) => {
                          setVideoData((prev) => ({ ...prev, Actors: value }));
                        }}
                        fullWidth
                      />

                      <TextField
                        value={videoData.Plot || ""}
                        label="Summarized plot"
                        onChange={({ target: { value } }) => {
                          setVideoData((prev) => ({ ...prev, Plot: value }));
                        }}
                        fullWidth
                      />

                      <TextField
                        value={videoData.youtubeTrailer || ""}
                        label="Youtube URL trailer"
                        onChange={({ target: { value } }) => {
                          setVideoData((prev) => ({
                            ...prev,
                            youtubeTrailer: value,
                          }));
                        }}
                        fullWidth
                      />

                      <TextField
                        value={videoData.Poster || ""}
                        label="Poster"
                        onChange={({ target: { value } }) => {
                          setVideoData((prev) => ({ ...prev, Poster: value }));
                        }}
                        fullWidth
                      />
                    </Paper>
                  </Fade>
                </Grid>
              )}
              <Grid item md={4} style={{ padding: "20px" }}>
                {selectedMovie && (
                  <Fade in={!searching}>
                    <Paper elevation={0}>
                      <img
                        width="100%"
                        src={
                          videoData.Poster ||
                          "https://via.placeholder.com/300x444?text=Poster"
                        }
                      />
                    </Paper>
                  </Fade>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setOpenImportModal(false)}>
          Cancel
        </Button>
        <Button id="add-video" variant="contained" onClick={() => saveDetail()}>
          Add
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default VideoImport;
