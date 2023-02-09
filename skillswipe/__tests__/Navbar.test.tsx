import { render,screen } from '@testing-library/react'
import NavBar from '@/components/NavBar'
import '@testing-library/jest-dom'
import React from 'react';
import Layout from '@/components/Layout';

jest.mock('next/router', () => require('next-router-mock'));
describe('Home', () => {
  const renderHome = () =>
        render(<NavBar />);
        beforeAll(()=>{
          <Layout></Layout>
      })
        it('should render NavBar without crashing', () => {
          renderHome();
          expect(screen.queryByTestId("Nav-Bar"));
      });
})
