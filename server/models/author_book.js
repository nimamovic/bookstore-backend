const createGuts = require('../helpers/model-guts');

const name = 'AuthorBook';
const tableName = 'authors_books';

const selectableProps = [
  'bookId',
  'authorId' 
];
const timeout = 1000;


module.exports = knex => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });
  
  const findByBookId = bookId => {
    return knex.select(selectableProps)
    .from(tableName)
    .where({bookId})
    .timeout(timeout);
  }

  const findByAuthorId = authorId => {
    return knex.select(selectableProps)
    .from(tableName)
    .where({authorId})
    .timeout(timeout);
  }

  return {
    ...guts,
    findByBookId,
    findByAuthorId
  };
}