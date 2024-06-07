# Aqua

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Aqua&uri=https%3A%2F%2Fraw.githubusercontent.com%2Ffellipeutaka%2Faqua%2Fmain%2F.github%2Fassets%2Finsomnia.json)

Aqua is an application for **managing participants in in-person events**.

The tool allows the organizer to register an event and open a public registration page.

Registered participants can emit a credential for check-in on the day of the event.

The system will scan the participant's credentials to allow entry to the event.

## Requirements

### FRs (Functional requirements)

- [x] The organizer must be able to register a new event;
- [x] The organizer must be able to view event data;
- [x] The organizer must be able to view the list of participants;
- [x] The participant must be able to register for an event;
- [x] The participant must be able to view their registration badge;
- [x] The participant must be able to check-in at the event;

### BRs (Business Rules)

- [x] The participant can only register for an event once;
- [x] Participants can only register for events with available places;
- [x] The participant can only check-in to an event once;

### NFRs (Non-Functional Requirements)

- [x] Check-in at the event will be carried out using a QRCode;

## Tech Stack

### Common

- Turborepo
- TypeScript
- Biome.js

## Backend

- Hono
- Neon
- PostgresSQL
- Drizzle
- Zod
- Swagger

## Frontend

- React 19
- Next.js 15
- Tailwind CSS

## Mobile

- React Native
- Expo
- Expo Router
- NativeWind