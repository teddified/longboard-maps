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
}
`

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
