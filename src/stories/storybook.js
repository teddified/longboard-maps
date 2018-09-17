import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'

import { action } from '@storybook/addon-actions'
import App from '../components/App'

const stories = storiesOf('Storybook Knobs', module)
stories.addDecorator(withKnobs)

stories.add('start', () => <App />)
