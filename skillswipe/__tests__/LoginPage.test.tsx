import Login from '@/pages/index'
import '@testing-library/jest-dom'
import React from 'react'
import { fireEvent, render, screen, waitFor } from './test-utils'

jest.mock('next/router', () => require('next-router-mock'))

describe('Login', () => {
  const renderLogin = () => render(<Login />)

  it('should render login page without crashing', async () => {
    renderLogin()
    await waitFor(() => {
      expect(screen.getByTestId('login-page')).toBeInTheDocument()
    })
  })
  it('should check inputs for login page', async () => {
    renderLogin()
    await waitFor(() => {
      const email = screen.getByTestId('email')
      const pass = screen.getByTestId('password')

      fireEvent.change(email, {
        target: { value: 'testing@gmail.com' },
      })
      fireEvent.change(pass, {
        target: { value: '1234567' },
      })

      expect(screen.getByTestId('email')).toHaveValue('testing@gmail.com')
      expect(screen.getByTestId('password')).toHaveValue('1234567')
    })
  })
})
