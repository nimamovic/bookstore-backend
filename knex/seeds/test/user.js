
exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, email: 'user@email.com', password: 'password'}
      ]);
    });
};

