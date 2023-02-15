import {render,screen } from '@testing-library/react'
import Register from '@/pages/register'
import '@testing-library/jest-dom'
import React from 'react';
import Layout from '@/components/Layout';
import { Provider } from "react-redux";
import store from "../src/Redux/store";

jest.mock('next/router', () => require('next-router-mock'));

describe('Register', () => {
  const renderSignup = () =>
        render(
        <Provider store={store}>
        {" "}
        <Layout>
        <Register />
        </Layout>
      </Provider>);
        // beforeAll(()=>{
        //     <Layout></Layout>
        // })
        it('should render register page without crashing', () => {
            renderSignup();
          expect(screen.queryByTestId("register-page"));
      });
})