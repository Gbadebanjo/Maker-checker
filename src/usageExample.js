const { Requester } = require('./entities/Requester');
const { Request } = require('./entities/Request');
const { Approver } = require('./entities/Approver');
const { initializeDb } = require('./services/dbService');
const { approveRequest, isExpired } = require('./services/requestService');

async function main() {
    // database connection
    const connection = await initializeDb();

    // Requester
    const requester = new Requester();
    requester.name = 'John Doe';


    // Approvers
    const approverA = new Approver();
    approverA.name = 'Approver A';
    approverA.allowedTypes = ['A'];

    const approverB = new Approver();
    approverB.name = 'Approver B';
    approverB.allowedTypes = ['A'];

    const approverC = new Approver();
    approverC.name = 'Approver C';
    approverC.allowedTypes = ['A', 'B'];


    // Requests
    const requestA = new Request();
    requestA.requester = requester;
    requestA.type = 'A';
    requestA.expirationDate = new Date('2024-04-06');

    const requestB = new Request();
    requestB.requester = requester;
    requestB.type = 'B';
    requestB.expirationDate = new Date('2024-04-06');

    const requestC = new Request();
    requestC.requester = requester;
    requestC.type = 'C';
    requestC.expirationDate = new Date('2024-04-06');

    // Request approval
    console.log(approveRequest(requestA, approverA)); // Should fail
    console.log(approveRequest(requestA, approverB)); // Should pass
    console.log(approveRequest(requestA, approverC)); // Should pass


    console.log(isExpired(requestA)); // Should be false
    console.log(isExpired(requestB)); // Should be false
     console.log(isExpired(requestC)); // Should be false

     // Close DB connection
    await connection.close();
}

main().catch(error => console.error(error));
