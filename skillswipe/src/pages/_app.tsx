import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import store from '../Redux/store'

const MyApp = ({ Component, pageProps }) => (
  <Provider store={store}>
    <ChakraProvider>
      <Component {...pageProps} />
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
)

export default appWithTranslation(MyApp)
