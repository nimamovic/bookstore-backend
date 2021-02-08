const createGuts = require('../helpers/model-guts');

const name = 'User';
const tableName = 'users';
const selectableProps = [
  'email',
  'password' 
];

module.exports = knex => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });
 
  return {
    ...guts
  }
}