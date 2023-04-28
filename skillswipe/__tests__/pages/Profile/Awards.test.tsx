import Awards from '@/components/Profile/Awards'
import { render, screen } from '../../test-utils'

jest.mock('next/router', () => require('next-router-mock'))

describe('Awards', () => {
  const renderAwards = () => render(<Awards />)
  it('should render Awards page without crashing', () => {
    renderAwards()
    expect(screen.queryByTestId('awards'))
  })
})
