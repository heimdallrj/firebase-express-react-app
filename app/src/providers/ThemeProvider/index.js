import React from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';

import './theme.css';

// TODO Ideally we can set theme related configuration here.
const theme = {};

export default function Provider({ children }) {
  return <StyledProvider theme={theme}>{children}</StyledProvider>;
}
