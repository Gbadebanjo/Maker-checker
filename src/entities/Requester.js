
const { EntitySchema } = require('typeorm');

const Requester = new EntitySchema({
    name: 'Requester',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        name: {
            type: 'text'
        }
    }
});

module.exports = { Requester }  ;