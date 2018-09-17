import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background: #ccc;
  }
  @media screen and (min-width: 425px) {
  .app {
    width: 400px;
  }
  body > * {
  user-select: none;
}
}
`

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
