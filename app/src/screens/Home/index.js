import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Page } from 'providers/ThemeProvider/styled';
import { Greet, Name, Grid, Tile } from './styled';

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  const { name } = user;

  return (
    <Page>
      <Greet>
        Hello! <Name>{name}</Name>
      </Greet>
      <Grid>
        <Link to="/orders">
          <Tile>Orders</Tile>
        </Link>

        <Link to="/create-order">
          <Tile>
            Create
            <br />
            New Order
          </Tile>
        </Link>

        <Link to="/logout">
          <Tile>Logout</Tile>
        </Link>
      </Grid>
    </Page>
  );
}
