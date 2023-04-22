import PostJob from '@/pages/postJob'
import { render, screen, waitFor } from '../test-utils'

jest.mock('next/router', () => require('next-router-mock'))
describe('PostJob', () => {
  const renderPostJob = () => render(<PostJob />)
  it('should render PostJob page without crashing', async () => {
    renderPostJob()
    // expect(screen.getByTestId('post-job'))
    await waitFor(() => {
      expect(screen.queryByTestId('post-job')).toBeInTheDocument()
    })
  })
})
