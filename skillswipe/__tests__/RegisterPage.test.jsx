import { render,screen } from '@testing-library/react'
import Register from '@/pages/register'
import '@testing-library/jest-dom'
import React from 'react';
import mockRouter from 'next-router-mock'

jest.mock('next/router', () => require('next-router-mock'));

describe('Register', () => {
  const renderSignup = () =>
        render(<Register />);
        beforeAll(()=>{
            mockRouter.push("/register");
        })
        it('should render register page without crashing', () => {
            renderSignup();
          expect(screen.getByTestId("register-page")).toBeInTheDocument();
      });

       it('should check for input types first name',()=>{
        renderSignup();
        expect(screen.getByTestId("first-name")).toBeInTheDocument();
       });

       it('should check for input types last name',()=>{
        renderSignup();
        expect(screen.getByTestId("last-name")).toBeInTheDocument();
       });
     
       it('should check for input type email',()=>{
        renderSignup();
        expect(screen.getByTestId("email")).toBeInTheDocument();
       });

       it('should check for input type password',()=>{
        renderSignup();
        expect(screen.getByTestId("password")).toBeInTheDocument();
       });

       it('should check for input type confirm password',()=>{
        renderSignup();
        expect(screen.getByTestId("confirm-password")).toBeInTheDocument();
       });
})