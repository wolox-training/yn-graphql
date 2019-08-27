exports.orderArrayByField = (array, orderBy) => array.sort((a, b) => (a[orderBy] >= b[orderBy] ? 1 : -1));

exports.filterArrayByTitle = (array, filter) =>
  array.filter(obj => obj.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
