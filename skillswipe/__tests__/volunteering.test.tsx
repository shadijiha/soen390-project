import Layout from '@/components/Layout'
import Volunteer from '@/components/Profile/Volunteering'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../src/Redux/store'

jest.mock('next/router', () => require('next-router-mock'))

describe('Volunteer', () => {
  const renderVolunteer = () =>
    render(
      <Provider store={store}>
        {' '}
        <Layout>
          <Volunteer />
        </Layout>
      </Provider>
    )
  // beforeAll(()=>{
  //     <Layout></Layout>
  // })
  it('should render volunteering page without crashing', () => {
    renderVolunteer()
    expect(screen.queryByTestId('volunteering'))
  })
})
