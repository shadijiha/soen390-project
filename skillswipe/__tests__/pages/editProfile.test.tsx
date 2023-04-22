import Register from '@/pages/register'
import { fireEvent, render, screen, waitFor } from '../test-utils'

jest.mock('next/router', () => require('next-router-mock'))

describe('Register', () => {
  const renderSignup = () => render(<Register />)
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

      expect(screen.getByTestId('first-name')).toHaveValue('test')
      expect(screen.getByTestId('last-name')).toHaveValue('testing')
      expect(screen.getByTestId('email')).toHaveValue('testing@gmail.com')
      expect(screen.getByTestId('password')).toHaveValue('1234567')
      expect(screen.getByTestId('confirm-password')).toHaveValue('1234567')
    })
  })
})
