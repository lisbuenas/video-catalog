import React from "react";
import { Grid, Button } from "@material-ui/core";

function Sidemenu(props) {
  return (
    <Grid item xs={4}>
      <Button onClick={() => props.editModal()}>Add new</Button>
      <Button onClick={() => props.importModal()}>Import from IMDB API</Button>
    </Grid>
  );
}

export default Sidemenu;
