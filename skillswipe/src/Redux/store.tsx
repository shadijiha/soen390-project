// import { applyMiddleware,legacy_createStore as createStore } from 'redux'
// import thunk from 'redux-thunk'
// import reducers from './Reducers'

// const store = createStore(reducers, {}, applyMiddleware(thunk))

// export default store

import { configureStore } from '@reduxjs/toolkit'
import reducers from './Reducers'

export default configureStore({ reducer: reducers })
