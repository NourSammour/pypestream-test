import React from 'react';
import { render } from '@testing-library/react';
import Index from '../pages/index';
import Subscribe from '../pages/subscribe';

test('Homepage test', () => {
  const { getByText } = render(<Index />);
  const subscribeElement = getByText(/To subscribe to our newsletter/);
  const publishElement = getByText(/To publish newsletter/);
  expect(subscribeElement).toBeInTheDocument();
  expect(publishElement).toBeInTheDocument();
});

test('Subscribe test', () => {
  const { getByText } = render(<Subscribe />);
  const titleElement = getByText(/Add new subscriber form/);
  expect(titleElement).toBeInTheDocument();
});
