## Description

Bridge Backend version 2.0 built with NestJS + Prisma + PostgreSQL

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Prisma setup 
   1. Setup instructions for Prisma can be found [here](https://docs.nestjs.com/recipes/prisma#set-up-prisma)

$npm set-script prepare "" && npm ci --only=production
