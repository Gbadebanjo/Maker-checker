# Application Documentation
This application is built using Express.js, pg (node-postgres), and TypeORM. Express.js is a web application framework for Node.js, pg is a non-blocking PostgreSQL client for Node.js, and TypeORM is an Object-Relational Mapping (ORM) tool for JavaScript.

This application manages requests and approvers using a database. It includes several functions to create requesters, approvers, and requests, and to approve requests and check if they are expired.


## Getting Started

To start using this application, follow these steps:

1. Clone the repository: `https://github.com/Gbadebanjo/Maker-checker.git`
2. Install the dependencies: `yarn install`
3. Start the application: `yarn src/usageExample`

### Testing

This application uses Jest for testing. Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It was installed as a dev dependency.

To run the tests, use the following command: `yarn jest`

#### Functions

#### createRequester

This function creates a new requester in the database. It takes a database connection and a name as parameters. It creates a new requester with the given name, saves the requester to the database, and returns the requester.

#### createApprover

This function creates a new approver in the database. It takes a database connection, an ID, an approver name, and an array of allowed types as parameters. It creates a new approver with the given parameters, saves the approver to the database, and returns the approver.

#### createRequest

This function creates a new request in the database. It takes a database connection, an ID, a requester, a type, and an expiration date as parameters. It creates a new request with the given parameters, saves the request to the database, and returns the request.

#### approveRequest

This function approves a request if the approver is valid. It takes a request and an approver as parameters. If the approver can approve the request, the function returns a message indicating that the request has been approved. If the approver cannot approve the request, the function returns a message indicating that the request cannot be approved.

#### isExpired

This function checks if a request is expired. It takes a request as a parameter and returns `true` if the request's expiration date is in the past, and `false` otherwise.


N.b => Environmental variables were not created to ensure easy access to resource.