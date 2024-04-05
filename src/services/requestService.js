function approveRequest(request, approver) {
    const requestType = request.type;
    const allowedTypes = approver.allowedTypes;

    if (
        (requestType === 'A' && allowedTypes.includes('A')) || 
         (requestType === 'B' && allowedTypes.includes('B')) || 
         (requestType === 'C' && allowedTypes.includes('C'))
         ) {
            return `${approver.name} cannot approve requests of type ${requestType}`;
     }  else if (
        (requestType === 'B' && !allowedTypes.includes('C')) ||
        (requestType === 'C' && allowedTypes.includes('A') || allowedTypes.includes('B'))
     )  {
        return `${approver.name} cannot approve requests of type ${requestType}`;
     }  else {
        return `${approver.name} approved the request of type ${requestType}`;
     }
}

function isExpired(request) {
    return request.expirationDate < new Date();
}

module.exports = { approveRequest, isExpired };