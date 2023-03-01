import { render, screen, waitFor } from '@testing-library/react'
import Profile from "../src/pages/profile/index";
import "@testing-library/jest-dom";
import React from "react";
import Layout from "@/components/Layout";
import { Provider } from "react-redux";
import store from "../src/Redux/store";

jest.mock("next/router", () => require("next-router-mock"));
describe("Profile", () => {
  const renderProfile = () =>
    render(
      <Provider store={store}>
        {" "}
        <Layout>
          <Profile />
        </Layout>
      </Provider>
    );
  
  it("Profile page should render without crashing",async () => {
    renderProfile();
    await waitFor(() => {
      expect(screen.getByTestId('profile-page')).toBeInTheDocument()
    })
  })
})
