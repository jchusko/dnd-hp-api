# Health Points API

## Overview

This REST API demonstrates health point management of a D&D style player character as described by [this assignment](https://github.com/DnDBeyond/back-end-developer-challenge).

## Tech Stack

- Typescript
- Express
- Tsoa
- MongoDB

## Setup

Follow your operating system's requirements to install compatible versions of the following

```
mongod: 7.0.8
mongosh: 2.2.5
```

Ensure you're on the right version of node

```
nvm use
```

Install dependencies

```
npm install
```

Set up the database and initialize with sample data.

```
cd ./database
mkdir data
mongod --dbpath ./data
./init.sh
```

You can run the init script at anytime to reset the data to its initial state.

Build code and run the server.

```
npm run build
npm run start
```

In a browser, navigate to localhost:3000/docs
