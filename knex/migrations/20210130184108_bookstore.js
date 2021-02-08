
exports.up = function(knex) {
    return knex.schema.createTable('books', function(table) {
        table.string('isbn').primary();
        table.string('title');
        table.integer('pages');
        table.integer('published');
        table.string('image');
      }).createTable('authors', function(table) {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
        table.string('first_name');
        table.string('last_name'); 
        table.dateTime('dob');
        table.string('image');   
      }).createTable('authors_books', function(table) {
        table.string('bookId').references('books.isbn').onUpdate('CASCADE').onDelete('CASCADE');
        table.uuid('authorId').references('authors.id').onUpdate('CASCADE').onDelete('CASCADE');
    })
};

exports.down = function(knex) {
      return knex.schema.dropTable('authors_books')
      .dropTable('authors')
      .dropTable('books')
};
