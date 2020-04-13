import React from 'react';
import { Grid, Button, Box } from '@material-ui/core';
import TheatersIcon from '@material-ui/icons/Theaters';

function Sidemenu(props) {
  return (
    <Grid
      item
      style={{
        height: 'calc(60%  180px)',
        minHeight: '400px',
        width: '250px',
        position: 'position',
        backgroundColor: '#2C97DF',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          textAlign: 'center',
          width: '100%',
          marginTop: '50px',
        }}
      >
        <TheatersIcon
          style={{
            fontSize: '50px',
            textAlign: 'center',
            display: 'inline-block',
            color: '#FFF',
          }}
          color="light"
        />
        <div>
          <Button
            alignItems="center"
            color="primary"
            onClick={() => props.importModal()}
          >
            Add Movie
          </Button>
        </div>
      </div>
    </Grid>
  );
}

export default Sidemenu;
