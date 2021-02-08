const createGuts = require('../helpers/model-guts');

const name = 'Book';
const tableName = 'books';
const selectableProps = [
  'isbn',
  'title',
  'pages',
  'published',
  'image'
];
const timeout = 1000;

module.exports = knex => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  const isISBNValid = (isbn) => {
    let toCheck = replaceAll(isbn,"-","");
    if(/^\d+$/.test(toCheck)){
      if(toCheck.length == 13) return true;
    }
    return false;
  }

  const findByISBN = isbn => knex.select(selectableProps)
    .from(tableName)
    .where({isbn})
    .timeout(timeout);

  const updateBook = (isbn, props) => knex.update(props)
    .from(tableName)
    .where({isbn})
    .timeout(timeout);
 
  return {
    ...guts,
    findByISBN,
    updateBook,
    isISBNValid
  }
}
const replaceAll = (string, search, replace) => {
  return string.split(search).join(replace);
}