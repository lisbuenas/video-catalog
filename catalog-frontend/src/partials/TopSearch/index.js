import React, { useState } from "react";
import { Grid, Input } from "@material-ui/core";

function TopSearch({ listCatalog }) {
  const [search, setSearch] = useState("");
  return (
    <Grid container style={{ height: "120px" }}>
      <Grid item md={1}>
        My Channel
      </Grid>
      <Grid item md={10}>
        <form style={{ textAlign: "center" }} onSubmit={listCatalog}>
          <Input
            placeholder="Type search catalog"
            style={{
              width: "50%",
              display: "inline-block",
              textAlign: "center",
              backgroundColor: "#FFF",
              padding: "5px",
              border: 0,
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </Grid>
      <Grid item md={1}>
        My Channel
      </Grid>
    </Grid>
  );
}

export default TopSearch;
