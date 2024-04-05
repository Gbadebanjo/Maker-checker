const { approveRequest, isExpired } = require('./services/requestService');
const { createApprover, createRequest, createRequester } = require('./usageExample');
const { initializeDb } = require('./services/dbService');

describe('requestService', () => {
    let connection;
    let requester;
    let approverA;
    let requestA;

    beforeAll(async () => {
        connection = await initializeDb();
        requester = await createRequester(connection, 'John Doe');
        approverA = await createApprover(connection, 1, 'Approver A', ['A']);
        requestA = await createRequest(connection, 101, requester, 'A', new Date('2024-04-15'));
    });

    afterAll(async () => {
        await connection.close();
    });

    test('approveRequest should return true for valid request and approver', async () => {
        const result = approveRequest(requestA, approverA);
        expect(result).toBe('Approver A approved the request of type A');
    });

    test('approveRequest should return false for invalid request and approver', async () => {
        const invalidApprover = await createApprover(connection, 2, 'Approver B', ['B']);
        const result = approveRequest(requestA, invalidApprover);
        expect(result).toBe('Approver B cannot approve requests of type A');
    });

    test('isExpired should return false for request with future expiration date', () => {
        const result = isExpired(requestA);
        expect(result).toBe(false);
    });

    test('isExpired should return true for request with past expiration date', async () => {
        const expiredRequest = await createRequest(connection, 102, requester, 'B', new Date('2020-04-10'));
        const result = isExpired(expiredRequest);
        expect(result).toBe(true);
    });
});