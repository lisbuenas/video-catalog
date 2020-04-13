import React, { useState } from 'react';
import { Grid, Input, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

function TopSearch(props) {
  const [search, setSearch] = useState('');
  return (
    <Grid container style={{ height: '140px' }}>
      <Grid
        item
        md={2}
        style={{
          display: 'inline-block',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        <img
          width="100"
          style={{
            display: 'inline-block',
            textAlign: 'center',
            paddingTop: '20px',
          }}
          alt="VideoLib"
          src="/icon.fw.png"
        />
      </Grid>
      <Grid item md={8}>
        <form
          style={{ textAlign: 'center' }}
          onSubmit={(e) => {
            e.preventDefault();
            props.listCatalog(search);
          }}
        >
          <Input
            placeholder="Type search catalog"
            style={{
              width: '50%',
              display: 'inline-block',
              textAlign: 'center',
              backgroundColor: '#FFF',
              padding: '5px',
              marginTop: '30px',
              border: 0,
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="contained" type="submit">
            <SearchIcon />
          </Button>
        </form>
      </Grid>
      <Grid item md={2}></Grid>
    </Grid>
  );
}

export default TopSearch;
