import {render,screen } from '@testing-library/react'
import Register from '@/pages/register'
import '@testing-library/jest-dom'
import React from 'react';
import Layout from '@/components/Layout';

jest.mock('next/router', () => require('next-router-mock'));

describe('Register', () => {
  const renderSignup = () =>
        render(<Register />);
        beforeAll(()=>{
            <Layout></Layout>
        })
        it('should render register page without crashing', () => {
            renderSignup();
          expect(screen.queryByTestId("register-page"));
      });
})