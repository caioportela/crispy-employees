# Crispy Employees (Server)

![Tests](https://github.com/caioportela/crispy-employees/workflows/Tests/badge.svg)
[![codecov](https://codecov.io/gh/caioportela/crispy-employees/branch/master/graph/badge.svg?token=BE1X0RHJ88)](https://codecov.io/gh/caioportela/crispy-employees)

## Table of Contents

<!-- toc -->
- [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#post-userssignin)
  - [Create an account](#post-companies)
  - [List all employees](#get-users)
  - [Find a specific employee](#get-usersid)
  - [Add an employee](#post-users)
  - [Update employee info](#put-usersid)
  - [Remove employee](#delete-usersid)
- [Test](#test)
<!-- tocstop -->

## Installation

```bash
$ git clone https://github.com/caioportela/crispy-employees.git
$ cd crispy-employees/server
$ npm install
```

## Usage

To run the application, execute
```bash
$ npm start
```
or
```bash
$ node app.js
```

The application is now running at `http://localhost:3000`

In this documentation all requests will be made through cURL
but also it can be done by using [Postman](https://www.postman.com/)

-------------------------------------------------------------------------------

### `POST /users/signin`

The token for authentication can be retrieved with `POST /users/signin`

- Headers
  - `Content-Type: application/json`

- Body
  ```json
  {
    "username": "sam.carter",
    "password": "123456"
  }
  ```

- Request
  ```bash
  $ curl -X POST http://localhost:3000/users/signin -H 'Content-Type:application/json' -d '{"username":"sam.carter","password":"123456"}'
  ```

- Response
  ```json
  {
    "company": {
      "id": 1,
      "name": "Architects",
      "createdAt":"2020-08-17T07:10:18.914Z",
      "updatedAt":"2020-08-17T07:10:18.914Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE1OTc2NjUxMDh9.wlOROI25smDsno3DIbILfG3zbBTQsMpGQMeJM1vL3MU",
    "user": {
      "id": 1,
      "admin": true,
      "name": "Sam Carter",
      "username": "sam.carter",
      "createdAt": "2020-08-17T07:10:19.092Z",
      "updatedAt": "2020-08-17T07:10:19.092Z",
      "company":1
    }
  }
  ```

-------------------------------------------------------------------------------

### `POST /companies`

An account can be created with `POST /companies`

- Headers
  - `Content-Type: application/json`

- Body
  ```json
  {
    "company": {
      "name": "Architects"
    },
    "user": {
      "name": "Sam Carter",
      "username": "sam.carter",
      "password": "123456"
    }
  }
  ```

- Request
  ```bash
  $ curl -X POST http://localhost:3000/companies -H 'Content-Type:application/json' -d '{"company":{"name":"Architects"},"user":{"name": "Sam Carter","username":"sam.carter","password":"123456"}}'
  ```

- Response
  ```json
  {
    "company": {
      "id": 1,
      "name": "Architects",
      "createdAt":"2020-08-17T13:12:07.923Z",
      "updatedAt": "2020-08-17T13:12:07.923Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxMCwiaWF0IjoxNTk3NjY5OTI4fQ.ovvRIueM4eUdSP0x8CLwmCor_2ntIOOamcq8T80BhF8",
    "user": {
      "id": 10,
      "name": "Sam Carter",
      "username": "sam.carter",
      "admin": true,
      "company": 1,
      "createdAt":"2020-08-17T13:12:08.070Z",
      "updatedAt": "2020-08-17T13:12:08.070Z"
    }
  }
  ```

-------------------------------------------------------------------------------

### `GET /users`
*This endpoint requires [authentication](#post-userssignin)*

A list of all employees can be retrieved with `GET /users`

- Headers
  - `Authorization: 'Bearer <token>'`

- Parameters
  - `term`: `String` - Search users by name or username

- Request
  ```bash
  $ curl http://localhost:3000/users -H 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE1OTc2NjU0MjJ9.nbp9JNAXN2fxxWqNQhJSb4Vfx4mKTEox83zrv74RX08'
  ```

- Response
  ```json
  {
    "users": [
      {
        "id": 1,
        "admin": true,
        "name": "Sharon Den Adel",
        "username": "sharon.adel",
        "createdAt":"2020-08-17T07:10:19.092Z",
        "updatedAt": "2020-08-17T07:10:19.092Z",
        "company": 1
      },
      {
        "id": 2,
        "admin": false,
        "name": "Danny Worsnop",
        "username": "danny",
        "createdAt": "2020-08-17T11:22:50.326Z",
        "updatedAt":"2020-08-17T11:22:50.326Z",
        "company": 1
      },
      {
        "id": 3,
        "admin": false,
        "name": "Elyze Ryd",
        "username": "elyryd",
        "createdAt": "2020-08-17T11:23:14.001Z",
        "updatedAt": "2020-08-17T11:23:14.001Z",
        "company": 1
      }
    ]
  }
  ```

-------------------------------------------------------------------------------

### `GET /users/:id`
*This endpoint requires [authentication](#post-userssignin)*

A specific employee can be retrieved with `GET /users/:id`

- Headers
  - `Authorization: 'Bearer <token>'`

- Request
  ```bash
  $ curl http://localhost:3000/users/1 -H 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE1OTc2NjU0MjJ9.nbp9JNAXN2fxxWqNQhJSb4Vfx4mKTEox83zrv74RX08'
  ```

- Response
  ```json
  {
    "user": {
      "id": 1,
      "admin": true,
      "name": "Sharon Den Adel",
      "username": "sharon.adel",
      "createdAt": "2020-08-17T07:10:19.092Z",
      "updatedAt": "2020-08-17T07:10:19.092Z",
      "company": 1
    }
  }
  ```
-------------------------------------------------------------------------------

### `POST /users`
*This endpoint requires [authentication](#post-userssignin)*

An user can be added with `POST /users`

- Headers
  - `Content-Type: application/json`
  - `Authorization: 'Bearer <token>'`

- Body
  ```json
  {
    "user": {
      "admin": true,
      "name": "Spencer Sotelo",
      "username": "spencer.sotelo",
      "password": "123456"
    }
  }
  ```

- Request
  ```bash
  $ curl -X POST http://localhost:3000/users -H 'Content-Type:application/json' -H 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE1OTc2NjU0MjJ9.nbp9JNAXN2fxxWqNQhJSb4Vfx4mKTEox83zrv74RX08' -d '{"user":{"admin":true,"name":"Spencer Sotelo","username":"spencer.sotelo","password":"123456"}}'
  ```

- Response
  ```json
  {
    "user": {
      "id": 9,
      "admin": true,
      "name": "Spencer Sotelo",
      "username": "spencer.sotelo",
      "createdAt": "2020-08-17T12:56:31.085Z",
      "updatedAt": "2020-08-17T12:56:31.085Z",
      "company": 1
    }
  }
  ```

-------------------------------------------------------------------------------

### `PUT /users/:id`
*This endpoint requires [authentication](#post-userssignin)*

The info about an employee can be updated with `PUT /users/:id`

- Headers
  - `Content-Type: application/json`
  - `Authorization: 'Bearer <token>'`

- Body
  ```json
  {
    "user": {
      "name": "Simone Simons",
      "username": "simone.simons"
    }
  }
  ```

- Request
  ```bash
  $ curl -X PUT http://localhost:3000/users/4 -H 'Content-Type:application/json' -H 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE1OTc2NjU0MjJ9.nbp9JNAXN2fxxWqNQhJSb4Vfx4mKTEox83zrv74RX08' -d '{"user":{"name":"Simone Simons","username":"simone.simons"}}'
  ```

- Response
  ```json
  {
    "user": {
      "id": 4,
      "admin": false,
      "name": "Simone Simons",
      "username": "simone.simons",
      "createdAt": "2020-08-17T11:23:48.397Z",
      "updatedAt": "2020-08-17T12:45:28.319Z",
      "company": 1
    }
  }
  ```

-------------------------------------------------------------------------------

### `DELETE /users/:id`
*This endpoint requires [authentication](#post-userssignin)*

An employee can be removed with `DELETE /users/:id`

An employee can only be removed by an admin

- Headers
  - `Authorization: 'Bearer <token>'`

- Request
  ```bash
  $ curl -X DELETE http://localhost:3000/users/8 -H 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE1OTc2NjU0MjJ9.nbp9JNAXN2fxxWqNQhJSb4Vfx4mKTEox83zrv74RX08'
  ```

-------------------------------------------------------------------------------

## Test

To run tests simply run:
```bash
$ npm test
```

For coverage:
```bash
$ npm run test-cov
```
