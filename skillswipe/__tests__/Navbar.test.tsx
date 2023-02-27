import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../src/Redux/store'

jest.mock('next/router', () => require('next-router-mock'))
describe('NavBar', () => {
  const renderNavBar = () =>
    render(
      <Provider store={store}>
        {' '}
        <Layout>
          <NavBar />
        </Layout>
      </Provider>
    )
  // beforeAll(() => {
  //   ;<Layout></Layout>
  // })
  it('should render NavBar without crashing', () => {
    renderNavBar()
    expect(screen.queryByTestId('Nav-Bar'))
  })
})
