import { render,screen } from '@testing-library/react'
import Home from '@/pages/home'
import '@testing-library/jest-dom'
import React from 'react';

describe('Home', () => {
  const renderHome = () =>
        render(<Home />);
        it('should display home page when rendered', () => {
          renderHome();
          expect(screen.getByTestId("Home-page")).toBeInTheDocument();
      });
})