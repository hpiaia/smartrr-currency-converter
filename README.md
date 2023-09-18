# Smartrr - Currency Converter

[![Test](https://github.com/hpiaia/smartrr-currency-converter/actions/workflows/test.yaml/badge.svg)](https://github.com/hpiaia/smartrr-currency-converter/actions/workflows/test.yaml)

This is my take-home exam for the position of Back End Engineer (TypeScript) at [Smartrr](https://smartrr.com/).

You can access the live version here: [smartrr-currency-converter.vercel.app](https://smartrr-currency-converter.vercel.app/).

## Technologies

Although the stack chosen for this project is a bit _too much_ for this specific application, I wanted to pick tools that
would be applicable on a real Smartrr project (microservices, queues, etc), that is what made the biggest impact on the final decision.

- Backend

  - Postgres (database)
  - Redis (queue and message broker)
  - Nest (application framework)
  - GraphQL (entrypoint for the api)
  - Jest (for testing)

- Frontend

  - React
  - Tailwind
  - Urql
  - GraphQL Codegen

## Architecture

The backend is composed of two different applications, which run independently of each other and communicate via a message broker (Redis).

- API

  - Handles requests from the web via GraphQL
  - Handles subscriptions via GraphQL and WebSockets (for real-time updates)

- Worker

  - Handles the conversion queue (which is stored on Redis)
  - Handles the cron (runs hourly and enqueues conversions to be processed)

Below is a flow diagram that represents the entire application architecture:

![flowchart](https://github.com/hpiaia/smartrr-currency-converter/blob/main/flowchart.png?raw=true)

## Running the application

1. Copy or rename the `.env.example` file to `.env`
2. Replace `<YOUR_RAPID_API_KEY>` with your Rapid API key inside the env file

TIP: You can do both steps with a single command:

```
sed 's/<YOUR_RAPID_API_KEY>/REAL_API_KEY/g' .env.example > .env
```

3. Run `docker compose up`
4. Wait for the containers to be up
5. Open http://localhost:3000

## Thanks

I had a great time diving into this take-home project. Really appreciate the opportunity to showcase my skills for this position. Hope you like what you see!

Cheers,

Humberto.