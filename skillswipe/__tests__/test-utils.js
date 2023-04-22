import Layout from '@/components/Layout'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../src/Redux/store'

// Add in any providers here if necessary:
const Providers = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
      <Provider store={store}>
        {' '}
        <Layout>{children}</Layout>
      </Provider>
    </GoogleOAuthProvider>
  )
}

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'
// override render method
export { customRender as render }
