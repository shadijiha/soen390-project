import Layout from '@/components/Layout'
import Profile from '@/pages/profile'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../src/Redux/store'

jest.mock('next/router', () => require('next-router-mock'))
describe('Profile', () => {
  const renderProfile = () =>
    render(
      <Provider store={store}>
        {' '}
        <Layout>
          <Profile />
        </Layout>
      </Provider>
    )
  //   beforeAll(()=>{
  //     <Layout></Layout>
  // })
  it('Profile page should render without crashing', () => {
    renderProfile()
    expect(screen.queryByTestId('profile-page'))
  })
})
