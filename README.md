## Introduction
This is an Webapp for Longboarders. The idea is to have an application that shows you the rating of each street so you can enjoy your longboard trip way more.

## Getting Started
Important: your need a working Google Api Key
- `git clone <url>`
- `npm install`
- `cd src/ && touch aKey.js && echo export const aKey = "<GOOGLE_API_KEY>" >> aKey.js`
- `npm start`

## Technology
- React
- Redux
- Google Maps Api
- Styled Components
- Cypress
- Jest

## How to use
The first screen is where your trips are going to be kept.
When clicking the add button on the bottom tab bar navigator you end up on the *add a trip* screen.
Here you can draw your route via start and destination markers. Additionally you can add waypoints in between the start/destination markers. When you are done editing you can navigate to the *rating* screen via the "Save Trip" button. On the *rating* screen you can rate certain criterias of your trip. Save it and you go back to the first screen. There you can see your first trip.
When you add more trips and some routes have the same path you can see their combined rating on the overview screen (right tab bar).
