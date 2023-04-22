import { render, screen, waitFor } from '../test-utils'
import Profile from "@/pages/profile/index";

jest.mock('next/router', () => require('next-router-mock'))
describe('Profile', () => {
  const renderProfile = () =>
    render(<Profile />)
  
  it("Profile page should render without crashing",async () => {
    renderProfile();
    await waitFor(() => {
      expect(screen.getByTestId('profile-page')).toBeInTheDocument()

    })
  })
})
