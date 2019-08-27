exports.orderArrayByField = (array, orderBy) => array.sort((a, b) => (a[orderBy] >= b[orderBy] ? 1 : -1));
