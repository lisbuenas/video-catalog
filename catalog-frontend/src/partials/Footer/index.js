import React from "react";
import { Grid } from "@material-ui/core";

function Footer() {
  return (
    <Grid container>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        About
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
}

export default Footer;
