import Home from '@/pages/home'
import { fireEvent, render, screen, waitFor } from '../test-utils'

jest.mock('next/router', () => require('next-router-mock'))
describe('Home', () => {
  const renderHome = () => render(<Home />)
  it('should display home page without crashing', async () => {
    renderHome()
    await waitFor(() => {
      expect(screen.getByTestId('Home-page')).toBeInTheDocument()
    })
  })
})
