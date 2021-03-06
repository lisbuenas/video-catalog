import React, { useState, useEffect } from 'react';

import ReactPlayer from 'react-player';
import { Dialog, DialogContent, DialogTitle, Button } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import styled from 'styled-components';
import SidePlayer from './side-player';

const StyledDialog = styled(Dialog)`
  .MuiBackdrop-root {
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: url(filters.svg#filter) blur(4px) saturate(150%);
    box-shadow: none;
  }
`;

function Player({ setOpenPlayerModal, openPlayerModal, videoData }) {
  let data = videoData;
  const [found, setFound] = useState(false);

  return (
    <>
      <StyledDialog
        open={openPlayerModal}
        aria-labelledby="player-movie-dialog"
        maxWidth="md"
        style={{ backgroundColor: 'none', boxShadow: 'none' }}
        overlayStyle={{ backgroundColor: 'transparent' }}
        fullWidth
        elevation={0}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
        shadow={0}
      >
        <DialogTitle id="about-movie-dialog">
          {(data && data.Title) || 'Video'}
          <Button
            style={{ float: 'right', marginRight: '125px' }}
            color="contrast"
            onClick={() => setOpenPlayerModal(false)}
          >
            <CancelIcon />
          </Button>
        </DialogTitle>
        <DialogContent
          elevation={0}
          style={{
            height: '60vh',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            marginRight: '125px',
          }}
        >
          <ReactPlayer
            onReady={() => {
              setFound(true);
              console.log('Found!');
            }}
            onError={() => {
              setFound(false);
              console.log('Not found');
            }}
            width="100%"
            height="100%"
            style={{ width: '60vh' }}
            url={data.youtubeTrailer || 'not found'}
            playing
          />

          {!found && (
            <img
              style={{ position: 'absolute', top: '65px' }}
              alt="Not found"
              src="/not-found.jpg"
            />
          )}
        </DialogContent>
      </StyledDialog>

      <SidePlayer openPlayerModal={openPlayerModal} videoData={videoData} />
    </>
  );
}

export default Player;
