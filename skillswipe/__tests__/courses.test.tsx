import {render,screen } from '@testing-library/react'
import Courses from '@/components/Profile/Courses'
import '@testing-library/jest-dom'
import React from 'react';
import Layout from '@/components/Layout';
import { Provider } from "react-redux";
import store from "../src/Redux/store";

jest.mock('next/router', () => require('next-router-mock'));

describe('courses', () => {
  const renderCourses = () =>
        render(
        <Provider store={store}>
        {" "}
        <Layout>
        <Courses />
        </Layout>
      </Provider>);
        // beforeAll(()=>{
        //     <Layout></Layout>
        // })
        it('should render courses page without crashing', () => {
            renderCourses();
          expect(screen.queryByTestId("courses"));
      });
})