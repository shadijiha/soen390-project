import Education from '@/components/Profile/education'
import { render, screen } from '../test-utils'

jest.mock('next/router', () => require('next-router-mock'))

describe('Education', () => {
  const renderEducation = () => render(<Education />)
  it('should render education page without crashing', () => {
    renderEducation()
    expect(screen.queryByTestId('education'))
  })
})
