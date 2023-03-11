import Layout from '@/components/Layout'
import Notification from '@/pages/notifications'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'

import React from 'react'
import { Provider } from 'react-redux'
import store from '../src/Redux/store'

jest.mock('next/router', () => require('next-router-mock'))

describe('Notification', () => {
  const renderNotification = () =>
    render(
      <Provider store={store}>
        {' '}
        <Layout>
          <Notification />
        </Layout>
      </Provider>
    )
  // beforeAll(()=>{
  //     <Layout></Layout>
  // })
  it('should render Notification page without crashing', async () => {
    renderNotification()
    await waitFor(() => {
      expect(screen.getByTestId('notification-page')).toBeInTheDocument()
    })
  })
})
