import { render,screen } from '@testing-library/react'
import Register from '@/pages/register'
import '@testing-library/jest-dom'
import React from 'react';
// import { useRouter } from 'next/router';
 import mockRouter from 'next-router-mock'

jest.mock('next/router', () => require('next-router-mock'));

describe('Register', () => {
  const renderSignup = () =>
        render(<Register />);
        it('should display Register page when rendered', () => {
            mockRouter.push("/register");

            renderSignup();
          expect(screen.getByTestId("register-page")).toBeInTheDocument();
      });
})