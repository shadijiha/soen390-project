import MyListings from '@/pages/myListings'
import { AxiosResponse } from 'axios'
import { render, screen, waitFor } from '../test-utils'

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('@/pages/api/api', () => {
  const original = jest.requireActual('@/pages/api/api')
  return {
    ...original,
    getOpenJobs: jest.fn(
      (): Promise<AxiosResponse<any, any>> =>
        Promise.resolve({
          data: [
            {
              id: 5,
              jobTitle: 'Software Engineering Intern',
              companyName: 'Amazon',
              location: 'Montreal',
              jobDescription: 'bjdwbchjbvdhcvdhjcvbmnd m',
              salary: '20',
              jobType: 'full-time',
              startDate: '2023-03-23T04:00:00.000Z',
              coverLetter: true,
              transcript: true,
              created_at: '2023-03-16T20:19:34.940Z',
              updated_at: '2023-03-16T20:19:34.940Z',
              user: {
                id: 4,
                firstName: '',
                lastName: '',
                email: 'messi@gmail.com',
                mobileNo: '',
                gender: 'MALE',
                profilePic: '',
                coverPic: null,
                cv: '',
                coverLetter: '',
                biography: null,
                userStatus: 'online',
                type: 'User',
                created_at: '2023-03-02T22:50:47.902Z',
                updated_at: '2023-04-05T03:48:54.000Z',
                deleted_at: null,
              },
              skills: [
                {
                  id: 1,
                  title: 'C++',
                  created_at: '2023-03-02T22:52:53.844Z',
                  updated_at: '2023-03-02T22:52:53.844Z',
                },
                {
                  id: 2,
                  title: 'Java',
                  created_at: '2023-03-02T22:53:07.867Z',
                  updated_at: '2023-03-02T22:53:07.867Z',
                },
              ],
            },
          ],
        }) as Promise<AxiosResponse<any, any>>
    ),
  }
})

describe('My Listings', () => {
  const renderMyListings = () => render(<MyListings />)
  it('should display listings page without crashing', async () => {
    renderMyListings()
    await waitFor(() => {
      expect(screen.getByTestId('myListings')).toBeInTheDocument()
    })
  })
})
