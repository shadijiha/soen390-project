import { render,screen } from '@testing-library/react'
import FindJob from '@/pages/findJob'
import '@testing-library/jest-dom'
import React from 'react';
import Layout from '@/components/Layout';

jest.mock('next/router', () => require('next-router-mock'));
describe('Home', () => {
  const renderHome = () =>
        render(<FindJob />);
        beforeAll(()=>{
          <Layout></Layout>
      })
        it('should render NavBar without crashing', () => {
          renderHome();
          expect(screen.queryByTestId("find-jobs"));
      });
})
