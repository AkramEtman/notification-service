<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
Notification Service is used to send notifications to user using different types and channels.

# Architecture
Notification Service is based on Hexagonal Architecture (Ports and adapters Architecture)
This Architecture provides isolation for core logic business from technology which used in projects like Database.
This Architecture helps us to foucs on business logic first and for testing business logic without thinking about techonlogy (Techonlogy Agnostic) 

This service is seperated code into 2 base modules
1. [Core module](src/core/core.module.ts)
  * Ports
  * [Notification Module](src/core/notifications/notifications.module.ts)
  * [User Module (Mocked)](src/core/users/users.module.ts)

2. [Adapters module](src/adapters/adapters.module.ts)
  * [Database Module](src/adapters/database/database.module.ts)
    * [Typegooose Module](src/adapters/database/typegoose/typegooose.module.ts)
  * [Scheduler](src/adapters/scheduler/)
  * [Controller](src/adapters/controllers/)

## Running the app

1. Start the service 
    ```bash
    docker compose up --build
    ```

1. Open Swaggers UI at <http://localhost:3000/api>.

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Basic Concepts

* Notification Service is built based on H TODO 
  * MongoDb
  * Swagger for API Docs

* Notification Module was based on Strategy pattern

### Add new Notification Channel Steps

1. create new class and implements [NotificationChannel Interface](src/core/notifications/channels/notificationChannel.interface.ts)
2. add class reference to [NotificationChannelModelEnum](src/core/notifications/notifications.contants.ts)
3. add class name to [NotificationChannelTypeEnum](src/core/notifications/notifications.contants.ts)

