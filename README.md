# moments-backend API

This API sends URLs to dynamoDB.

## Prerequisites

You will need an AWS access_key_id and secret_key.

## Getting started

Clone this repo and cd into it

```
git clone https://github.com/keirbetts/moments-backend/pull/4
cd moments-backend
```

Install the dependencies

```
npm i
```

In the root directory, create a .env file

```
touch .env
```

Add the following code to the .env file

```
ACCESS_KEY_ID=youraccesskeyid
SECRET_KEY=yoursecretkey
```

## API endpoints

The following endpoints are available:

```
GET /api/images/:usr

POST /api/images/:usr

POST /api/upload

POST /api/createuser

```

## More specifically, each endpoint responds like this:

GET /api/images/:usr

### Responds with

An array of all of the images in the database belonging to that user

---

POST /api/images/:usr

### Request body accepts

An object in the form { url: url}

### Responds with

A status code of 200

---

POST /api/upload

### Request body accepts

An object in the form { imageLocation: url, usr: username}

### Responds with

A status code of 201 and an object in the form { msg: "Succesfully updated DB"}

---

POST /api/createuser

### Request body accepts

An object in the form { usr: username }

### Responds with

A status code of 201 and an object in the form { msg: ":usr account created in DB"}

---

## Built using

- Express.js
- aws-sdk
- aws-serverless-express
- Jest
- Supertest
- Cors
- Claudia
