import Layout from '@/components/Layout'
import Home from '@/pages/home'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../src/Redux/store'

jest.mock('next/router', () => require('next-router-mock'))
describe('Home', () => {
  const renderHome = () =>
    render(
      <Provider store={store}>
        {' '}
        <Layout>
          <Home />
        </Layout>
      </Provider>
    )
  //   beforeAll(()=>{

  // })
  it('should display home page without crashing', async () => {
    renderHome()
    await waitFor(() => {
      expect(screen.getByTestId('Home-page')).toBeInTheDocument()
    })
  })
})
