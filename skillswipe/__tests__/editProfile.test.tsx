import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../src/Redux/store'
import Layout from '@/components/Layout'
import EditProfile from '@/pages/editProfile'

jest.mock('next/router', () => require('next-router-mock'))
describe('edit-profile', () => {
    const renderEditProfile = () =>
      render(
        <Provider store={store}>
          {' '}
          <Layout>
            <EditProfile/>
          </Layout>
        </Provider>
      )
    it('should render courses page without crashing', () => {
      renderEditProfile()
      expect(screen.queryByTestId('edit-profile'))
    })
  })