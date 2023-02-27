import Layout from '@/components/Layout'
import PostJob from '@/pages/postJob'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../src/Redux/store'

jest.mock('next/router', () => require('next-router-mock'))
describe('PostJob', () => {
  const renderPostJob = () =>
    render(
      <Provider store={store}>
        {' '}
        <Layout>
          <PostJob />
        </Layout>
      </Provider>
    )
  //   beforeAll(()=>{
  //     <Layout></Layout>
  // })
  it('should render PostJob page without crashing', async () => {
    renderPostJob()
    await waitFor(() => {
      expect(screen.getByTestId('post-job')).toBeInTheDocument()
    })
  })
})
