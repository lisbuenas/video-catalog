import React from 'react';
import {
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Typography,
} from '@material-ui/core';

function CardImport(props) {
  let el = props.movie;
  return (
    <Card
      onClick={() => props.searchById(el.imdbID)}
      style={{ backgroundColor: 'transparent' }}
    >
      <CardActionArea>
        <CardContent>
          <Grid container>
            <Grid item md={2}>
              <img width="50" src={el.Poster} />
            </Grid>
            <Grid item md={10}>
              <div style={{ marginLeft: '30px;' }}>
                <Typography variant="h7" component="h7" color="primary">
                  {el.Title}
                </Typography>
                <br />
                <Typography
                  variant="subtitle1"
                  component="subtitle1"
                  color="primary"
                >
                  {el.Year}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardImport;
