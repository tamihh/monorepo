import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  background: #00d2ca;
  padding: 20px;
  font-family: 'Arial';
  display: flex;
  align-content: center;
  justify-content: center;
  color: #fff;
`

export const HotelsModule: React.FunctionComponent<{}> = () => {
  return <Container>Hotels Module</Container>
};

export default HotelsModule;
