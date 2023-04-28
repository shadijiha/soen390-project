import PostJob from '@/pages/postJob'
import { fireEvent, render, screen, waitFor } from '../test-utils'

jest.mock('next/router', () => require('next-router-mock'))

describe('PostJob', () => {
  const renderPostJob = () => render(<PostJob />)
  it('should render PostJob page without crashing', async () => {
    renderPostJob()
    await waitFor(() => {
      expect(screen.queryByTestId('post-job')).toBeInTheDocument()
    })
  })

  it('should check inputs for Post Job Form', async () => {
    renderPostJob()
    await waitFor(() => {
      const show = screen.getByTestId('showForm')
      fireEvent.change(show, {
        target: { checked: true },
      })
    })
    await waitFor(() => {
      const submit = screen.getByTestId('submit')
      // const externalUrl = screen.getByTestId('externalUrltest')
      const jobTitle = screen.getByTestId('jobTitle')
      const companyName = screen.getByTestId('companyName')
      const location = screen.getByTestId('location')
      const salary = screen.getByTestId('salary')
      const date = screen.getByTestId('date')
      const skills = screen.getByTestId('skills')
      const jobDescription = screen.getByTestId('jobDescription')

      // fireEvent.change(externalUrl, {
      //   target: { value: 'test' },
      // })
      fireEvent.change(jobTitle, {
        target: { value: 'test' },
      })
      fireEvent.change(companyName, {
        target: { value: 'test' },
      })
      fireEvent.change(location, {
        target: { value: 'test' },
      })
      fireEvent.change(salary, {
        target: { value: 10 },
      })
      fireEvent.change(date, {
        target: { value: Date.now() },
      })
      fireEvent.change(skills, {
        target: { value: 'test' },
      })
      fireEvent.change(jobDescription, {
        target: { value: 'test' },
      })

      // expect(screen.getByTestId('externalUrl')).toHaveValue('test')
      expect(screen.getByTestId('jobTitle')).toHaveValue('test')
      expect(screen.getByTestId('companyName')).toHaveValue('test')
      expect(screen.getByTestId('location')).toHaveValue('test')
      expect(screen.getByTestId('salary')).toHaveValue('10')
      expect(screen.getByTestId('skills')).toHaveValue('test')
      expect(screen.getByTestId('jobDescription')).toHaveValue('test')

      submit.click()
    })
  })
})
