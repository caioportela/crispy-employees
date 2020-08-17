# crispy-employees

A small application featuring crispy employees

<!-- toc -->
- [Installation](#installation)
- [Client](/client/README.md)
- [Server](/server/README.md)
  - [Authentication](/server/README.md#post-userssignin)
  - [Create an account](/server/README.md#post-companies)
  - [List all employees](/server/README.md#get-users)
  - [Find a specific employee](/server/README.md#get-usersid)
  - [Add an employee](/server/README.md#post-users)
  - [Update employee info](/server/README.md#put-usersid)
  - [Remove employee](/server/README.md#delete-usersid)
<!-- tocstop -->

## Installation

Make sure you have the latest version of [Compose](https://docs.docker.com/compose/install)

```bash
$ git clone https://github.com/caioportela/crispy-employees.git
$ cd crispy-employees
$ docker-compose up
```

The [client](/client/README.md) will be running at http://localhost:8080,
and the [server](/server/README.md) will be at http://localhost:3000
