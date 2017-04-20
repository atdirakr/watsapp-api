# Building a RESTful API in Node and Express

Using the new Express 4.0 Router to build an API


## Requirements

- Node and npm

## Installation

- Clone the repo
- Install dependencies: `npm install`
- Start the server: `node server.js`

## Testing the API
Test your API using [Postman](https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop)

## End Points Documentation

URL : http://localhost:8080/api

signup --> Endpoint

1. Method = POST, Route = /signup , fields {firstname,lastname,mobileno,gender} (create new user)
2. Method = GET, Route = /signup (Get all users)
3. Method = GET, Route = /signup/:id (Get user by id)
4. Method = PUT, Route = /signup/:id ,fields{firstname,lastname,mobileno,gender}(Update user by id)
5. Method = DELETE, Route = /signup/:id (Delete user by id)
6. Method = PUT, Route = /signup/otp/:id , field {otp} (Activate user by verifying OTP)
---------------------------------------------------------------------

message --> Endpoint

1. Method = GET, Route = /message (Get all messages)
2. Method = DELETE, Route = /message/:id (Delete message by id)
3. Method = POST, Route = /message/:from/:to : field {content} (Send message to particular user)
4. Method = GET, Route = /message/:from/:to (Get message between two users)
---------------------------------------------------------------------

status --> Endpoint

1. Method = GET, Route = /status (Get all status)
2. Method = GET, Route = /status/:id (Get status by id)
3. Method = GET, Route = /status/:userid (Get status by userid)
4. Method = PUT, Route = /status/:id/:userid (Update status by id), fields {content,userid}
5. Method = Delete, Route = /status/:id (Delete status by id)
---------------------------------------------------------------------
