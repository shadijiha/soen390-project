import {render,screen } from '@testing-library/react'
import Awards from '@/components/Profile/Awards'
import '@testing-library/jest-dom'
import React from 'react';
import Layout from '@/components/Layout';
import { Provider } from "react-redux";
import store from "../src/Redux/store";

jest.mock('next/router', () => require('next-router-mock'));

describe('Awards', () => {
  const renderAwards = () =>
        render(
        <Provider store={store}>
        {" "}
        <Layout>
        <Awards />
        </Layout>
      </Provider>);
        // beforeAll(()=>{
        //     <Layout></Layout>
        // })
        it('should render Awards page without crashing', () => {
            renderAwards();
          expect(screen.queryByTestId("awards"));
      });
})