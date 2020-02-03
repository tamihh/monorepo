import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  background: #007bff;
  padding: 20px;
  font-family: 'Arial';
  display: flex;
  align-content: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
`

export const FlightsModule: React.FunctionComponent<{}> = () => {
  return <Container>Flights Module</Container>
};

export default FlightsModule;
