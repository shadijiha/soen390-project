import Layout from '@/components/Layout'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import Inbox from '../src/pages/inbox/index'
import store from '../src/Redux/store'
import Inbox from '../src/pages/inbox/index'

jest.mock('next/router', () => require('next-router-mock'))
describe('Inbox', () => {
  const renderInbox = () =>
    render(
      <Provider store={store}>
        {' '}
        <Layout>
          <Inbox />
        </Layout>
      </Provider>
    )
  it('should display Inbox page without crashing', async () => {
    renderInbox()
    await waitFor(() => {
      expect(screen.getByTestId('inbox')).toBeInTheDocument()
    })
  })
})
