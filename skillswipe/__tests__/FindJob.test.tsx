import { render, screen } from "@testing-library/react";
import FindJob from "@/pages/findJob";
import "@testing-library/jest-dom";
import React from "react";
import Layout from "@/components/Layout";
import { Provider } from "react-redux";
import store from "../src/Redux/store";

jest.mock("next/router", () => require("next-router-mock"));
describe("Jobs", () => {
  const renderJobs = () =>
    render(
      <Provider store={store}>
        {" "}
        <Layout>
          <FindJob />
        </Layout>
      </Provider>
    );
  //   beforeAll(()=>{
  //     <Layout></Layout>
  // })
  it("should render find job page without crashing", () => {
    renderJobs();
    expect(screen.queryByTestId("find-jobs"));
  });
});
