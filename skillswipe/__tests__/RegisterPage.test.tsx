import Layout from '@/components/Layout'
import Register from '@/pages/register'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

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
      expect(screen.getByTestId('register-page')).toBeInTheDocument()
    })
  })
  it('should check inputs for register page', async () => {
    renderSignup()
    await waitFor(() => {
      const fname = screen.getByTestId('first-name')
      const lname = screen.getByTestId('last-name')
      const email = screen.getByTestId('email')
      const pass = screen.getByTestId('password')
      const confirmPass = screen.getByTestId('confirm-password')
      const gender = screen.getByTestId('gender')
      fireEvent.change(fname, {
        target: { value: 'test' },
      })
      fireEvent.change(lname, {
        target: { value: 'testing' },
      })
      fireEvent.change(email, {
        target: { value: 'testing@gmail.com' },
      })
      fireEvent.change(pass, {
        target: { value: '1234567' },
      })
      fireEvent.change(confirmPass, {
        target: { value: '1234567' },
      })
      fireEvent.change(gender, {
        target: { value: 'MALE' },
      })

      expect(screen.getByTestId('first-name')).toHaveValue('test')
      expect(screen.getByTestId('last-name')).toHaveValue('testing')
      expect(screen.getByTestId('email')).toHaveValue('testing@gmail.com')
      expect(screen.getByTestId('password')).toHaveValue('1234567')
      expect(screen.getByTestId('confirm-password')).toHaveValue('1234567')
      expect(screen.getByTestId('gender')).toHaveValue('MALE')
    })
  })
})
