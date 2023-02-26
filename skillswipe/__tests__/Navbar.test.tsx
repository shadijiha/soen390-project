import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'

jest.mock('next/router', () => require('next-router-mock'))
describe('Home', () => {
  const renderHome = () => render(<NavBar />)
  beforeAll(() => {
    ;<Layout></Layout>
  })
  it('should render NavBar without crashing', async() => {
    renderHome()
    await waitFor(() => {
      expect(screen.getByTestId('Nav-Bar')).toBeInTheDocument()
    })
  })
})
