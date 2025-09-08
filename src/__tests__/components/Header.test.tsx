import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router';

import Header from '../../components/Header';

describe('Header component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    // Check for a generic header element
    const header = screen.getByRole('logo');
    expect(header).toBeInTheDocument();
  });

  it('displays the site title', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    // Assuming the header contains a site title
    const title = screen.getByText(/scientific officer/i);
    expect(title).toBeInTheDocument();
  });

  it('contains navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    // Assuming there are navigation links
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });
});