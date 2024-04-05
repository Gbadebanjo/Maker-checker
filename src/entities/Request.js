const { EntitySchema } = require('typeorm');

const Request = new EntitySchema({
    name: 'Request',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        type: {
            type: 'text'
        },
        expirationDate: {
            type: 'date'
        }
    },
    relations: {
        requester: {
            target: 'Requester',
            type: 'many-to-one',
            joinColumn: true
        }
    }
});

module.exports = { Request };