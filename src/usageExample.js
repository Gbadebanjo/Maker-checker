const { Requester } = require('./entities/Requester');
const { Request } = require('./entities/Request');
const { Approver } = require('./entities/Approver');
const { initializeDb } = require('./services/dbService');
const { approveRequest, isExpired } = require('./services/requestService');

// createApprover function to create approver in the database
async function createApprover(connection, id, approverName, allowedTypes) {
    const approverRepo = connection.getRepository(Approver);
    const approver = approverRepo.create();
    approver.id = id;
    approver.approverName = approverName;
    approver.allowedTypes = allowedTypes;
    await approverRepo.save(approver);
    return approver;
}

// createRequest function to create request in the database
async function createRequest(connection, id, requester, type, expirationDate) {
    const requestRepo = connection.getRepository(Request);
    const request = requestRepo.create();
    request.id = id;
    request.requester = requester;
    request.type = type;
    request.expirationDate = expirationDate;
    await requestRepo.save(request);
    return request;
}

// createRequester function to create requester in the database
async function createRequester(connection, name) {
    const requesterRepo = connection.getRepository(Requester);
    const requester = requesterRepo.create();
    requester.name = name;
    await requesterRepo.save(requester);
    return requester;
}


async function main() {
    // database connection
    const connection = await initializeDb();

    // Requester
    const requester = await createRequester(connection, 'John Doe');


    // Approvers
    const approverA = await createApprover(connection, 1, 'Approver A', ['']);
    const approverB = await createApprover(connection, 2, 'Approver B', ['A']);
    const approverC = await createApprover(connection, 3, 'Approver C', ['A', 'B']);


    // Requests
    const requestA = await createRequest(connection, 101, requester, 'A', new Date('2024-04-15'));
    const requestB = await createRequest(connection, 102, requester, 'B', new Date('2024-04-10'));
    const requestC = await createRequest(connection, 103, requester, 'C', new Date('2024-04-04'));


    // Request approval
    console.log(approveRequest(requestC, approverA)); // Should fail
    console.log(approveRequest(requestA, approverB)); // Should pass
    console.log(approveRequest(requestB, approverC)); // Should pass


    console.log(isExpired(requestA)); // Should be false
    console.log(isExpired(requestB)); // Should be false
     console.log(isExpired(requestC)); // Should be true

     // Close DB connection
    await connection.close();
}

main().catch(error => console.error(error));
module.exports = { createRequester, createApprover, createRequest, approveRequest, isExpired };
