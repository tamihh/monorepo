import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  background: #00d29a;
  padding: 20px;
  font-family: 'Arial';
  display: flex;
  align-content: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
`

export const CarsModule: React.FunctionComponent<{}> = () => {
  return <Container>Cars Module</Container>
};

export default CarsModule;
