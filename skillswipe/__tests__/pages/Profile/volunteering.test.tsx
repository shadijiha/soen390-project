import Volunteer from '@/components/Profile/Volunteering'
import { fireEvent, render, screen, waitFor } from '../../test-utils'

jest.mock('next/router', () => require('next-router-mock'))

describe('Volunteer', () => {
  const volunteering = [
    {
      id: 1,
      company: 'test',
      title: 'test',
      start_year: 1,
      end_year: 1,
      created_at: Date.now(),
      updated_at: Date.now(),
    },
  ]
  const renderVolunteer = () => render(<Volunteer volunteer={volunteering} />)
  it('should render volunteering page without crashing', () => {
    renderVolunteer()
    expect(screen.queryByTestId('volunteering'))
  })
})
