# Marketplace Strapi Nuxt

This project is a getting started with Strapi.

Strapi is an open source headless Content Management System, meaning it focuses on the backend. It enables the design of the data models and the generation of the api layer from an admin panel.

The goal of this project is to build a template of a general purpose platform. As for the demo below, the marketplace use case was selected.

## Demo

Live preview: https://e-commerce-strapi.netlify.app/

## Features

- User Authentication with email/password & with Google Auth.
- Post review.
- Nuxt v2 as JS framework
- Ant Design Vue v1 as UI library.
- Responsive design.
- Supports serverless deployment with GCP.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env files

In fontend directory:
`STRAPI_URL`
`IPINFO_TOKEN`

In backend directory:
`APP_KEYS`
`API_TOKEN_SALT`
`ADMIN_JWT_SECRET`
`JWT_SECRET`
`SENDGRID_API_KEY`
`SENDGRID_SENDER_EMAIL`

## Run Locally

Clone the project

```bash
  git clone https://github.com/becem-gharbi/e-commerce-strapi-nuxt.git
```

Go to the backend directory

```bash
  cd e-commerce-strapi-nuxt/backend
```

Install dependencies

```bash
  npm install
```

Start the backend server

```bash
  npm run develop
```

Go to the frontend directory

```bash
  cd e-commerce-strapi-nuxt/frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Appendix

https://strapi.io/

https://1x.antdv.com/docs/vue/introduce/

https://nuxtjs.org/

https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/google-app-engine.html
