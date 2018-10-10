export function getTrips() {
  return fetch('http://localhost:3001/trip').then(res => res.json())
}

export function createTrip(trip) {
  console.log(trip)
  delete trip.trips.StartBool
  delete trip.trips.hint
  delete trip.trips.addWaypoints
  return fetch('http://localhost:3001/trip/new', {
    method: 'POST',
    body: JSON.stringify(trip.trips),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
}
