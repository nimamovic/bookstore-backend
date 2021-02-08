
exports.seed = function(knex) {
  return knex('books').del()
    .then(function () {
      return knex('books').insert([
        {isbn: '978-0062570994', title: 'Honor Among Thieves', pages: 480, published: 2018, image: 'https://images-na.ssl-images-amazon.com/images/I/81ODdgmIiSL.jpg'},
        {isbn: '9780451465153', title: 'Terminated', pages: 320, published: 2013, image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1374613109l/18232069.jpg'}
      ]);
    }).then(function () {
      return knex('authors').del();
    }).then(function () {
      return knex('authors').insert([
        {id: 'a3513690-63a8-11eb-ae93-0242ac130002', first_name: 'Rachel', last_name: 'Caine', dob: '1962-04-27 00:00:00', image: 'https://d1fd687oe6a92y.cloudfront.net/blog/lead_art/Nov_3_Seen_Caine_CROP.jpg'},
        {id: '8766efea-63aa-11eb-ae93-0242ac130002', first_name: 'Ann', last_name: 'Aguirre', dob: '1970-08-27 00:00:00', image: 'https://mybookabyss.files.wordpress.com/2018/02/lowres1-e1518016307667.jpg?w=300&h=286'}
      ]);
    }).then(function () {
      return knex('authors_books').del();
    }).then(function () {
      return knex('authors_books').insert([
        {bookId: '978-0062570994', authorId: 'a3513690-63a8-11eb-ae93-0242ac130002'},
        {bookId: '978-0062570994', authorId: '8766efea-63aa-11eb-ae93-0242ac130002'},
        {bookId: '9780451465153', authorId: 'a3513690-63a8-11eb-ae93-0242ac130002'}
      ]);
    });
};
