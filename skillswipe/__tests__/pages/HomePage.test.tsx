import Home from '@/pages/home'
import { AxiosResponse } from 'axios'
import { fireEvent, render, screen, waitFor } from '../test-utils'

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('@/pages/api/api', () => {
  const original = jest.requireActual('@/pages/api/api')
  return {
    ...original,
    checkLogin: jest.fn(() =>
      Promise.resolve({
        data: {
          name: '',
          title: '',
          location: '',
          school: '',
          experience: 'Five years of experience in full stack development',
          experience2: 'Three years of experience in mobile development',
          experience3: 'Two years of experience in data analysis',
          image:
            'https://marketplace.canva.com/EAFKZzWYqqE/1/0/1600w/canva-purple-navy-neon-gradient-modern-minimalist-man-tiktok-profile-picture-kqzwo_88iLY.jpg',
          cover:
            'https://img.rawpixel.com/private/static/images/website/2022-05/v904-nunny-016_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d04dc64ebef3b6c3ad40a5687bbe31dc',
        },
      })
    ),
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
    applyToJob: jest.fn(() => {}),
    createPosts: jest.fn(() => {}),
    deletePost: jest.fn(() => {}),
    getPosts: jest.fn(
      () =>
        Promise.resolve({
          data: [
            {
              id: 13,
              content: 'hey',
              image: null,
              created_at: '2023-03-31T17:47:41.043Z',
              updated_at: '2023-03-31T17:47:41.043Z',
              deleted_at: null,
              user: {
                id: 4,
                firstName: 'usama',
                lastName: 'saleem',
                email: 'messi@gmail.com',
                mobileNo: null,
                gender: 'MALE',
                profilePic: null,
                coverPic: null,
                cv: null,
                coverLetter: null,
                biography: null,
                userStatus: 'online',
                type: 'User',
                created_at: '2023-03-02T22:50:47.902Z',
                updated_at: '2023-03-28T05:07:19.000Z',
                deleted_at: null,
              },
            },
          ],
        }) as Promise<AxiosResponse<any, any>>
    ),
  }
})
describe('Home', () => {
  const renderHome = () => render(<Home />)
  it('should display home page without crashing', async () => {
    renderHome()
    await waitFor(() => {
      expect(screen.getByTestId('Home-page')).toBeInTheDocument()
    })
  })
})
