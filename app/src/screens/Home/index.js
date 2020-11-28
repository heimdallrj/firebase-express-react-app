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
        <Tile>
          <Link to="/orders">Orders</Link>
        </Tile>
        <Tile>
          <Link to="/create-order">
            Create
            <br />
            New Order
          </Link>
        </Tile>
        <Tile>
          <Link to="/logout">Logout</Link>
        </Tile>
      </Grid>
    </Page>
  );
}
