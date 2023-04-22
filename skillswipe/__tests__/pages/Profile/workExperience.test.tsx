import WorkExperience from '@/components/Profile/WorkExperience'
import { fireEvent, render, screen } from '../../test-utils'

jest.mock('next/router', () => require('next-router-mock'))

describe('Work Experience', () => {
  const exp = [
    {
      id: 1,
      company: 'test',
      title: 'test',
      start_year: '2012',
      end_year: '2012',
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      id: 2,
      company: 'test',
      title: 'test',
      start_year: '2012',
      end_year: '2012',
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      id: 3,
      company: 'test',
      title: 'test',
      start_year: '2012',
      end_year: '2012',
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      id: 4,
      company: 'test',
      title: 'test',
      start_year: '2012',
      end_year: '2012',
      created_at: Date.now(),
      updated_at: Date.now(),
    },
  ]
  const renderWorkExperience = () => render(<WorkExperience experience={exp} />)
  it('should render Work Experience page without crashing', () => {
    renderWorkExperience()
    expect(screen.queryByTestId('workExperience'))
  })

  it('should render Work Experience page without crashing on mobile', () => {
    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(480)
    window.innerWidth = 500
    fireEvent(window, new Event('resize'))
    const renderWorkExperience = () => render(<WorkExperience experience={exp} />)

    renderWorkExperience()
    expect(screen.queryByTestId('workExperience'))
  })
})
