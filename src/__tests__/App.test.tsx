import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BrowserRouter } from 'react-router';

import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
  it('renders the home page by default', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const homePageElement = screen.getByText(/Home Page/i);
    expect(homePageElement).toBeInTheDocument();
  });
});