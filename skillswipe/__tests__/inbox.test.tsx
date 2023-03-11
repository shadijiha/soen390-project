import Layout from '@/components/Layout'
import Inbox from '@/pages/inbox/index'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'

import React from 'react'
import { Provider } from 'react-redux'
import store from '../src/Redux/store'

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
  // beforeAll(()=>{
  //     <Layout></Layout>
  // })
  it('should render Inbox page without crashing', async () => {
    renderInbox()
    await waitFor(() => {
      expect(screen.getByTestId('inbox-page')).toBeInTheDocument()
    })
  })
})
