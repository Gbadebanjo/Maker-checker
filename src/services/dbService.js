const { createConnection } = require('typeorm');
const  {Requester} = require('../entities/Requester');
const  {Approver}  = require('../entities/Approver');
const  {Request}  = require('../entities/Request');

async function initializeDb() {
    try {
        const connection = await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'Gbadebanjo',
            database: 'postgres',
            synchronize: true,
            entities: [Requester, Approver, Request]
        });
        console.log('Database connection established');
        return connection;
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
}

module.exports = { initializeDb };