import Courses from '@/components/Profile/Courses'
import { render, screen } from '../../test-utils'

jest.mock('next/router', () => require('next-router-mock'))

describe('courses', () => {
  const renderCourses = () => render(<Courses />)

  it('should render courses page without crashing', () => {
    renderCourses()
    expect(screen.queryByTestId('courses'))
  })
})
