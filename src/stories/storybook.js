import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import { Map, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react'

import { aKey } from '../aKey'

const stories = storiesOf('Storybook Knobs', module)
stories.addDecorator(withKnobs)

const google = window.google
stories.add('display map', () => (
  <React.Fragment>
    <Map
      google={google}
      // onClick={(mapProps, map, event) => changePosition(event)}
      initialCenter={{
        lat: 53.572536,
        lng: 9.983114,
      }}
      zoom={14}
    />
  </React.Fragment>
))

export default GoogleApiWrapper({
  // apiKey: 'AIzaSyBJs-n4MF2WGvD6q1PfEoDJw6UQKTpAhBU',
  apiKey: aKey,
})(React.Fragment)
