import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

(function () {
  const rootEl = document.body.appendChild(document.createElement('div'))
  ReactDOM.render(<App />, rootEl)
})()
