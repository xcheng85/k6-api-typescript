## Prerequisites
```shell
nvm list
nvm use v16.20.2
```
## Installation

```bash
npm install
```
## Running the test
```bash
npm start

export BEARER_TOKEN=

export SERVICE_URL='xxx'

export NUM_USERS=1

k6 run dist/request-session-load-test.js --env SERVICE_URL=$SERVICE_URL --env TOKEN=$BEARER_TOKEN --env NUM_USERS=$NUM_USERS 
```