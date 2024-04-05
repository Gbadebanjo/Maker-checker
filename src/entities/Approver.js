
const { EntitySchema } = require('typeorm');

const Approver = new EntitySchema({
    name: 'Approver',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        approverName: {
            type: 'text'
        },
        allowedTypes: {
            type: 'simple-array'
        }
    }
});


module.exports = { Approver };
