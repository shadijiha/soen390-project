import { render,screen } from '@testing-library/react'
import Profile from '@/pages/profile'
import '@testing-library/jest-dom'
import React from 'react';
import Layout from '@/components/Layout';

jest.mock('next/router', () => require('next-router-mock'));
describe('Home', () => {
  const renderHome = () =>
        render(<Profile />);
        beforeAll(()=>{
          <Layout></Layout>
      })
        it('Profile page should render without crashing', () => {
          renderHome();
          expect(screen.queryByTestId("profile-page"));
      });
})