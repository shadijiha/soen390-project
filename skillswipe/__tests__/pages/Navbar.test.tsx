import NavBar from '@/components/NavBar'
import { render, screen, waitFor } from '../test-utils'

jest.mock('next/router', () => require('next-router-mock'))

describe('NavBar', () => {
  const renderNavBar = () => render(<NavBar />)
  it('should render NavBar without crashing', async () => {
    renderNavBar()
    await waitFor(() => {
      expect(screen.getByTestId('Nav-Bar')).toBeInTheDocument()
    })
  })
})
