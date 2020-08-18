import React from 'react'
import './App.css'
import store from './store'
import { Provider } from 'react-redux'
import Repositories from './components/Repositories'
import {fontAwesomeInitialize} from './assets/icons'

fontAwesomeInitialize()
const App = () => (
  <Provider store={store}>
    <Repositories />
  </Provider>
)

export default App
