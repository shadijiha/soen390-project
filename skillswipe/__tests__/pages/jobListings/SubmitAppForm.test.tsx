import SubmitAppForm from '@/components/jobListing/SubmitAppForm'
import { fireEvent, render, screen, waitFor } from '../../test-utils'

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
    getPendingRequest: jest.fn(() =>
      Promise.resolve({
        data: [],
      })
    ),
    changeStatus: jest.fn(() => Promise.resolve({})),
  }
})

describe('Submit App Form', () => {
  const renderSubmitAppForm = () => render(<SubmitAppForm />)
  it('should render Submit App Form page without crashing', async () => {
    renderSubmitAppForm()
    await waitFor(() => {
      expect(screen.queryByTestId('submit-app-form')).toBeInTheDocument()
    })
  })

  it('should check inputs for Submit App Form', async () => {
    renderSubmitAppForm()
    await waitFor(() => {
      const submit = screen.getByTestId('submit')
      const name = screen.getByTestId('name')
      const email = screen.getByTestId('email')
      const resume = screen.getByTestId('resume')
      const cover = screen.getByTestId('cover')

      fireEvent.change(name, {
        target: { value: 'test' },
      })
      fireEvent.change(email, {
        target: { value: 'testing@gmail.com' },
      })
      fireEvent.change(resume, {
        target: { value: '1234567' },
      })
      fireEvent.change(cover, {
        target: { value: '1234567' },
      })

      expect(screen.getByTestId('name')).toHaveValue('test')
      expect(screen.getByTestId('email')).toHaveValue('testing@gmail.com')
      expect(screen.getByTestId('resume')).toHaveValue('1234567')
      expect(screen.getByTestId('cover')).toHaveValue('1234567')

      submit.click()
    })
  })
})
