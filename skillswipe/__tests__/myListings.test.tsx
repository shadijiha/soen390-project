import Layout from '@/components/Layout'
import MyListings from '@/pages/myListings'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../src/Redux/store'

jest.mock('next/router', () => require('next-router-mock'))
describe('Home', () => {
  const renderMyListings = () =>
    render(
      <Provider store={store}>
        {' '}
        <Layout>
          <MyListings />
        </Layout>
      </Provider>
    )
  //   beforeAll(()=>{

  // })
  it('should display listings page without crashing', async () => {
    renderMyListings()
    await waitFor(() => {
      expect(screen.getByTestId('myListings')).toBeInTheDocument()
    })
  })
})
