import { render,screen } from '@testing-library/react'
import Home from '@/pages/home'
import '@testing-library/jest-dom'
import React from 'react';
import Layout from '@/components/Layout';

jest.mock('next/router', () => require('next-router-mock'));
describe('Home', () => {
  const renderHome = () =>
        render(<Home />);
        beforeAll(()=>{
          <Layout></Layout>
      })
        it('should display home page when rendered', () => {
          renderHome();
          expect(screen.queryByTestId("Home-page"));
      });
})