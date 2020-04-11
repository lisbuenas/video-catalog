import React from "react";
import { Grid, Card, CardActionArea } from "@material-ui/core";

function CardVideo(props) {
  let el = props.video;
  return (
    <Grid item xs={4} p={2}>
      <Card
        style={{
          margin: "2px",
          height: "200px",
          backgroundImage: "url(" + (el.Poster || "") + ")",
          backgroundSize: "cover",
          borderBottom:
            "3px solid " + "#" + Math.random().toString(16).substr(-6),
        }}
      >
        <CardActionArea>
          <div onClick={() => props.openPlayer(el.youtubeVideo)}>
            Ver trailer
          </div>
          {el.Title}
          {el.Genre}
          <div onClick={() => props.editModal(el._id)}>Editar</div>
        </CardActionArea>
      </Card>{" "}
    </Grid>
  );
}

export default CardVideo;
