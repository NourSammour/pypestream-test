This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Technology

To learn more about this test app for Pypestream, take a look at the following resources:

- [NodeJS](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [NextJS](https://nextjs.org/) - The React Framework for Production.
- [NextJS](https://newcss.net/) - Write modern websites using only HTML.
- [Sequelize](https://sequelize.org/) - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.



You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Database

This app use Postgres DB, you need to install postgres driver locally or use docker image, after that you need to create empty db to use it for this app

To reset db you need to open this link
http://localhost:3000/api/sync-db


## Env Variables
```
DB_NAME=***
DB_USERNAME=***
DB_PASSWORD=***
DB_HOST=***
MAILTRAP_API_TOKEN=***
MAILTRAP_INBOX_ID=***
```

## Demo
https://drive.google.com/file/d/1OWSSaCO_4cfhbFCqGLQXMYWCEiEjpd22/view?usp=sharing