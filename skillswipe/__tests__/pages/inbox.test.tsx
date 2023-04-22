import { default as Inbox } from '@/pages/inbox/index'
import { fireEvent, render, screen, waitFor } from '../test-utils'

jest.mock('next/router', () => require('next-router-mock'))
describe('Inbox', () => {
  const renderInbox = () => render(<Inbox />)
  it('should display Inbox page without crashing', async () => {
    renderInbox()
    await waitFor(() => {
      expect(screen.getByTestId('inbox')).toBeInTheDocument()
    })
  })
})
