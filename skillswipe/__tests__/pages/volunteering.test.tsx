import Volunteer from '@/components/Profile/Volunteering'
import { fireEvent, render, screen, waitFor } from '../test-utils'

jest.mock('next/router', () => require('next-router-mock'))

describe('Volunteer', () => {
  const renderVolunteer = () => render(<Volunteer />)
  it('should render volunteering page without crashing', () => {
    renderVolunteer()
    expect(screen.queryByTestId('volunteering'))
  })
})
