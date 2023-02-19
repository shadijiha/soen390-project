import {render,screen } from '@testing-library/react'
import Education from '@/components/Profile/education'
import '@testing-library/jest-dom'
import React from 'react';
import Layout from '@/components/Layout';
import { Provider } from "react-redux";
import store from "../src/Redux/store";

jest.mock('next/router', () => require('next-router-mock'));

describe('Education', () => {
  const renderEducation = () =>
        render(
        <Provider store={store}>
        {" "}
        <Layout>
        <Education />
        </Layout>
      </Provider>);
        // beforeAll(()=>{
        //     <Layout></Layout>
        // })
        it('should render education page without crashing', () => {
            renderEducation();
          expect(screen.queryByTestId("education"));
      });
})