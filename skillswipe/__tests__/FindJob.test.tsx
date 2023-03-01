import Layout from '@/components/Layout'
import JobListing from '@/pages/jobListing'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../src/Redux/store'

jest.mock('next/router', () => require('next-router-mock'))
describe('JobListing', () => {
  const renderJobListing = () =>
    render(
      <Provider store={store}>
        {' '}
        <Layout>
          <JobListing />
        </Layout>
      </Provider>
    )
  //   beforeAll(()=>{
  //     <Layout></Layout>
  // })
  it('should render find job page without crashing', async() => {
    renderJobs()
    await waitFor(() => {
      expect(screen.getByTestId('find-jobs')).toBeInTheDocument()

    })
  })
})
