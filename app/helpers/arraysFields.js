exports.orderArrayByField = (array, orderBy) => array.sort((a, b) => (a[orderBy] >= b[orderBy] ? 1 : -1));

exports.filterArrayByField = (array, query, field) =>
  array.filter(obj => obj[field].toLowerCase().indexOf(query.toLowerCase()) !== -1);
