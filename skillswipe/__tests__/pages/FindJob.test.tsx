import JobListing from '@/pages/jobListing/[id]'
import { render, screen, waitFor } from '../test-utils'

jest.mock('next/router', () => require('next-router-mock'))
describe('JobListing', () => {
  const renderJobListing = () => render(<JobListing />)
  it('should render JobListing page without crashing', async () => {
    renderJobListing()
    await waitFor(() => {
      expect(screen.getByTestId('job-listing')).toBeInTheDocument()
    })
  })
})
