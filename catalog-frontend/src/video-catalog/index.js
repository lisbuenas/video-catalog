import React, { useEffect, useState } from "react";

import { Card, Button, Grid, CardActionArea, Input } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import api from "services/api";

import VideoEdit from "./edit";
import VideoImport from "./import";
import Player from "./player";
import CardVideo from "./card-video";
import Sidemenu from "partials/Sidemenu";

function VideoCatalog() {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openPlayerModal, setOpenPlayerModal] = useState(false);
  const [openImportModal, setOpenImportModal] = useState(false);
  const [id, setId] = useState(null);
  const [search, setSearch] = useState("");
  const [zeroResults, setZeroResults] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    setLoading(true);
    listCatalog();
  }, []);

  async function listCatalog(e = null) {
    e && e.preventDefault();
    setLoading(true);
    try {
      let response = await api.get(`videos?search=${search}`);
      if (response.data.data.length > 0) {
        setZeroResults(false);
        setVideoList(response.data.data);
      } else {
        setVideoList([]);
        setZeroResults(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function editModal(id = null) {
    setId(id);
    setOpenModal(true);
  }

  function importModal() {
    setOpenImportModal(true);
  }

  function openPlayer(videoData = null) {
    console.log(videoData);
    setVideoUrl(videoData);
    setVideoData(videoData);
    setOpenPlayerModal(true);
  }

  return (
    <>
      <VideoEdit
        openModal={openModal}
        setOpenModal={setOpenModal}
        listCatalog={listCatalog}
        id={id}
      />
      <VideoImport
        openImportModal={openImportModal}
        listCatalog={listCatalog}
        setOpenImportModal={setOpenImportModal}
      />
      <Player
        openPlayerModal={openPlayerModal}
        setOpenPlayerModal={setOpenPlayerModal}
        videoData={videoData}
      />

      <Grid container>
        <Grid item xs={1}></Grid>
        {loading && <Skeleton animation="wave" />}
        <Grid item xs={10}>
          <Grid container style={{ height: "120px" }}>
            <Grid item md={1}>
              My Channel
            </Grid>
            <Grid item md={10}>
              <form onSubmit={listCatalog}>
                <Input onChange={(e) => setSearch(e.target.value)} />
              </form>
            </Grid>
            <Grid item md={1}>
              My Channel
            </Grid>
          </Grid>

          <Grid container style={{ position: "relative" }}>
            <Sidemenu editModal={editModal} importModal={importModal} />
            <Grid
              item
              style={{ position: "relative", width: "calc( 100% - 250px)" }}
            >
              <Grid container>
                {!loading &&
                  videoList.map((el, index) => {
                    return (
                      <CardVideo
                        key={index}
                        video={el}
                        editModal={editModal}
                        openPlayer={openPlayer}
                      />
                    );
                  })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={1}></Grid>
      </Grid>
    </>
  );
}
export default VideoCatalog;
