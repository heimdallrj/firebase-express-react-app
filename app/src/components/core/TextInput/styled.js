import styled from 'styled-components';

import { Row as RowSource } from 'providers/ThemeProvider/styled';

export const Row = styled(RowSource)`
  margin: 20px 0;
`;

export const Label = styled.p`
  margin: 8px 0;
`;

export const Input = styled.input``;

export const Error = styled.p`
  color: red;
  font-size: 11px;
`;
