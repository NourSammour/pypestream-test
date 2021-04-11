import React from 'react';
import { render } from '@testing-library/react';
import Index from '../pages/index';
import Publish from '../pages/publish';

test('Homepage test', () => {
  const { getByText } = render(<Index />);
  const subscribeElement = getByText(/To subscribe to our newsletter/);
  const publishElement = getByText(/To publish newsletter/);
  expect(subscribeElement).toBeInTheDocument();
  expect(publishElement).toBeInTheDocument();
});

test('Publish test', () => {
  const { getByText } = render(<Publish />);
  const titleElement = getByText(/Add Subscriber/);
  expect(titleElement).toBeInTheDocument();
});
