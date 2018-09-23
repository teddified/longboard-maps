import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    background: #ccc;
  }
  * {
  font-family: 'Source Sans Pro', sans-serif;
  user-select: none;
  }
}
`

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
