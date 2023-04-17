import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import store from '../Redux/store'
import { AuthProvider } from '../contexts/AuthContext'

const MyApp = ({ Component, pageProps }) => (
  <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
    <Provider store={store}>
      <ChakraProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </ChakraProvider>
    </Provider>
  </GoogleOAuthProvider>
)

export default appWithTranslation(MyApp)
