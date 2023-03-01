import Layout from '@/components/Layout'
import Register from '@/pages/register'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../src/Redux/store'

jest.mock('next/router', () => require('next-router-mock'))

describe('Register', () => {
  const renderSignup = () =>
    render(
      <Provider store={store}>
        {' '}
        <Layout>
          <Register />
        </Layout>
      </Provider>
    )
  // beforeAll(()=>{
  //     <Layout></Layout>
  // })
  it('should render register page without crashing', async () => {
    renderSignup()
    await waitFor(() => {
      expect(screen.queryByTestId('register-page')).toBeInTheDocument()
    })
  })
})
