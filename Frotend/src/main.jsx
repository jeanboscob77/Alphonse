import 'bootstrap/dist/css/bootstrap.min.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider} from 'react-redux'
import  store from './redux/store.js'
import React from 'react'


createRoot(document.getElementById('root')).render(
  <div>
  <Provider store={store}>
 <App />
 </Provider>
  </div>
)
