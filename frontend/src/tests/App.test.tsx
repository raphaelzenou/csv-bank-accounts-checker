import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

it('should render app with the right buttons enabled / disabled', () => {
  const container = render(<App />);

  const uploadButton = screen.getByText('Upload');
  expect(uploadButton).toBeInTheDocument();
  expect(uploadButton).not.toBeDisabled();

  const processButton = screen.getByText('Process');
  expect(processButton).toBeInTheDocument();
  expect(processButton).toBeDisabled();

  expect(container).toMatchSnapshot();

});
