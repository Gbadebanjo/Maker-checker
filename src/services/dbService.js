const { createConnection } = require('typeorm');

async function initializeDb() {
    try {
        const connection = await createConnection();
        console.log('Database connection established');
        return connection;
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
}

module.exports = { initializeDb };