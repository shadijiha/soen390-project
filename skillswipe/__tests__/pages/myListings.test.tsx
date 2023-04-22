import { getOpenJobs } from '@/pages/api/api'
import MyListings from '@/pages/myListings'
import { render, screen, waitFor } from '../test-utils'

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('@/pages/api/api', () => {
  const original = jest.requireActual('@/pages/api/api')
  return {
    ...original,
    getOpenJobs: jest.fn(),
  }
})

describe('My Listings', () => {
  getOpenJobs.mockImplementation(
    (): Promise<AxiosResponse<any, any>> =>
      Promise.resolve({
        user: {
          id: 1,
        },
        companyName: 'test',
        id: 1,
        jobTitle: 'test',
        location: 'test',
      }) as Promise<AxiosResponse<any, any>>
  )
  const renderMyListings = () => render(<MyListings />)
  it('should display listings page without crashing', async () => {
    renderMyListings()
    await waitFor(() => {
      expect(screen.getByTestId('myListings')).toBeInTheDocument()
    })
  })
})
