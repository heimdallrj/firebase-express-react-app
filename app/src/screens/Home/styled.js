import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px 50px;
`;

export const Greet = styled.h3``;

export const Name = styled.span`
  color: #999;
`;

export const Grid = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
`;

export const Tile = styled.li`
  margin: 0;
  padding: 0 8px;
  width: 150px;
  height: 90px;
  border: 1px solid #ccc;
  margin: 5px 20px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
`;
