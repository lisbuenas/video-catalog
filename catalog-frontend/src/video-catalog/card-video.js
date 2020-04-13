import React from 'react';
import styled from 'styled-components';
import { Grid, Card, CardActionArea } from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import EditIcon from '@material-ui/icons/Edit';

const StyledCard = styled(Card)`
  margin: 4px;
  height: 200px;
  border: 0;
  transition-duration: 1s;
  &:hover {
    opacity: 0.8;
  }
`;

function CardVideo(props) {
  let el = props.video;
  return (
    <Grid item xs={4} p={2}>
      <StyledCard
        style={{
          // backgroundImage: "url(" + (el.Poster || "") + ")",

          background:
            'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' +
            (el.Poster || '') +
            ')',
          backgroundSize: 'cover',
          borderBottom:
            '3px solid ' + '#' + Math.random().toString(16).substr(-6),
        }}
      >
        <CardActionArea>
          <div
            style={{ color: '#FFF', padding: '10px' }}
            onClick={() => props.editModal(el._id)}
          >
            <EditIcon />
          </div>
          <div
            onClick={() => props.openPlayer(el)}
            style={{
              width: '100%',
              color: '#FFF',
              fontSize: '45px',
              textAlign: 'center',
              opacity: '0.5',
              marginTop: '30px',
            }}
          >
            <PlayCircleFilledIcon style={{ fontSize: '65px' }} />
          </div>

          <div style={{ color: '#FFF', padding: '10px' }}>
            <h3 style={{ color: '#FFF', padding: '0', margin: 0 }}>
              {el.Title}
            </h3>
            <h4 style={{ color: '#FFF', padding: '0', margin: 0 }}>
              {el.Genre}
            </h4>
          </div>
        </CardActionArea>
      </StyledCard>{' '}
    </Grid>
  );
}

export default CardVideo;
