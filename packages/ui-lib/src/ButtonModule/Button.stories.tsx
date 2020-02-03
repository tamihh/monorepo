import { storiesOf } from '@storybook/react';
import React from 'react';
import { ButtonModule } from './Button';

const text = `These are the buttons.`;
const noop = () => (e: any) => '';

storiesOf('Common/Buttons', module)
  .addParameters({ info: { text, source: true } })
  .add('Primary', () => <ButtonModule id='2345' label='Submit' type='primary' onClick={noop} disabled={false} />)
  .add('Secondary', () => <ButtonModule id='2377' label='Submit' type='secondary' onClick={noop} disabled={false} />)
  .add('Tertiary', () => <ButtonModule id='2306' label='Submit' type='tertiary' onClick={noop} disabled={false} />);
