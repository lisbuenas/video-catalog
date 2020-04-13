import React from 'react';
import { Grid } from '@material-ui/core';

function Footer() {
  return (
    <Grid
      container
      style={{ backgroundColor: '#E9E6E1', height: '120px', padding: '20px' }}
    >
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        About
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
}

export default Footer;
