import React from 'react';
import styled from 'styled-components';

import { ButtonStyled } from '@monorepo-poc/ui-lib'
import { CarsModule } from '@monorepo-poc/cars'
import { HotelsModule } from '@monorepo-poc/hotels'
import { FlightsModule } from '@monorepo-poc/flights'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
`

const Content = styled.div`
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const App = () => {
  return (
    <Container>
      <Content>
        <ButtonStyled>Button</ButtonStyled>
        <CarsModule />
        <FlightsModule />
        <HotelsModule />
      </Content>
    </Container>
  );
}

export default App;

