import React from "react";
import { Grid, Button } from "@material-ui/core";
import TheatersIcon from "@material-ui/icons/Theaters";

function Sidemenu(props) {
  return (
    <Grid
      item
      style={{
        height: "calc(60%  180px)",
        width: "250px",
        position: "position",
        backgroundColor: "#2C97DF",
      }}
    >
      <div
        style={{ display: "inline-block", textAlign: "center", width: "100%" }}
      >
        <TheatersIcon
          style={{
            fontSize: "50px",
            textAlign: "center",
            display: "inline-block",
            color: "#FFF",
          }}
          color="light"
        />
      </div>
      <Button color="primary" onClick={() => props.editModal()}>
        Add new
      </Button>
      <Button color="primary" onClick={() => props.importModal()}>
        Import from IMDB API
      </Button>
    </Grid>
  );
}

export default Sidemenu;
