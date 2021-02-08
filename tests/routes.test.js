const request = require('supertest')
const app = require('../server');
let token = "";
describe('Testing bookstore with authors and books', () => {
  it('Get token', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: "user@email.com",
        password: "password"
       });
    token = res.body.token
    expect(res.statusCode).toEqual(200)
  });
  it('Post book', async () => {
    const res = await request(app)
      .post('/books')
      .set('x-access-token', token)
      .send({
        isbn: "978-92-95055-02-5",
        title: "My First Book 2",
        published: 2015,
        pages: 200,
        image: "https://lh3.googleusercontent.com/proxy/_RVOm6bKj7qp1Pgy1kvq-sNQSLtsteKpajBbdjCLsF86-Zb1er59k8fGjPnX_cxV6mqoFvxblZCWUHoVW0W2PETJLu-_6YM",
        authors: []
       });
    expect(res.statusCode).toEqual(201);
  });
  it('Get book', async () => {
    const bookId = "978-92-95055-02-5";
    const res = await request(app).get(`/books/${bookId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("book");
  });
  it('Get all books', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('books');
    expect(res.body.books).toHaveLength(1);
  });
  it('Update book', async () => {
    const res = await request(app)
      .put('/books/978-92-95055-02-5')
      .set('x-access-token', token)
      .send({
        pages: 205,
        image: "https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-03.png",
      });
    expect(res.statusCode).toEqual(200);
  });
  it('Update book deneid, no token provided', async () => {
    const res = await request(app)
      .put('/books/978-92-95055-02-5')
      .send({
        published: 2020,
      });
    expect(res.statusCode).toEqual(403);
  });
  it('Post author', async () => {
    const res = await request(app)
      .post('/authors')
      .set('x-access-token', token)
      .send({
        first_name: "Test",
        last_name: "Last",
        dob: "2000-03-20",
        image: "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png",
        books: ["978-92-95055-02-5"]
       });
    expect(res.statusCode).toEqual(201);
  });
  it('Get all authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('authors');
    expect(res.body.authors).toHaveLength(1);
  });
  it('Get author', async () => {
    const resForAuthorsId = await request(app).get('/authors');
    const authorId = resForAuthorsId.body.authors[0].id;
    const resForAuthor = await request(app).get(`/authors/${authorId}`);
    expect(resForAuthor.statusCode).toEqual(200);
    expect(resForAuthor.body).toHaveProperty("author");
  });
  it('Edit author', async () => {
    const resForAuthorsId = await request(app).get('/authors');
    const authorId = resForAuthorsId.body.authors[0].id;
    const resForUpdate = await request(app)
      .put(`/authors/${authorId}`)
      .set('x-access-token', token)
      .send({
        last_name: "TestLast"
      });
    expect(resForUpdate.statusCode).toEqual(200);
  });
  it('Delete book from author', async () => {
    const resForAuthorsId = await request(app).get('/authors');
    const authorId = resForAuthorsId.body.authors[0].id;
    const res = await request(app)
      .delete(`/authors/${authorId}/books/978-92-95055-02-5`)
      .set('x-access-token', token)
      .send();
    expect(res.statusCode).toEqual(200);
  });
  it('Add book to author', async () => {
    const resForAuthorsId = await request(app).get('/authors');
    const authorId = resForAuthorsId.body.authors[0].id;
    const res = await request(app)
      .post(`/authors/${authorId}/books`)
      .set('x-access-token', token)
      .send({
        book: "978-92-95055-02-5"
      });
    expect(res.statusCode).toEqual(200);
  });
  it('Get book from author', async () => {
    const resForAuthorsId = await request(app).get('/authors');
    const authorId = resForAuthorsId.body.authors[0].id;
    const res = await request(app).get(`/authors/${authorId}/books`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('books');
    expect(res.body.books[0]).toHaveProperty('isbn','978-92-95055-02-5');
  });
  it('Delete author of book', async () => {
    const resForAuthorsId = await request(app).get('/authors');
    const authorId = resForAuthorsId.body.authors[0].id;
    const res = await request(app)
    .delete(`/books/978-92-95055-02-5/authors/${authorId}`)
    .set('x-access-token', token);
    expect(res.statusCode).toEqual(200);
  });
  it('Add author to book', async () => {
    const resForAuthorsId = await request(app).get('/authors');
    const authorId = resForAuthorsId.body.authors[0].id;
    const res = await request(app)
    .post('/books/978-92-95055-02-5/authors')
    .set('x-access-token', token)
    .send({
      author: authorId
    })
    expect(res.statusCode).toEqual(200);
  });
  it('Delete author', async () => {
    const resForAuthorsId = await request(app).get('/authors');
    const authorId = resForAuthorsId.body.authors[0].id;
    const res = await request(app)
    .delete(`/authors/${authorId}`)
    .set('x-access-token', token);
    expect(res.statusCode).toEqual(200);
  });
  it('Get authors of book, there is no authors', async () => {
    const res = await request(app).get('/books/978-92-95055-02-5/authors');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('authors');
    expect(res.body.authors).toHaveLength(0);
  });
  it('Delete author', async () => {
    const res = await request(app)
    .delete(`/books/978-92-95055-02-5`)
    .set('x-access-token', token);
    expect(res.statusCode).toEqual(200);
  });
  it('Get authors and books, there is no authors neither books', async (done) => {
    const resGetAuthors = await request(app).get('/authors');
    const resGetBooks = await request(app).get('/books');
    expect(resGetAuthors.statusCode).toEqual(200);
    expect(resGetBooks.statusCode).toEqual(200);
    expect(resGetAuthors.body).toHaveProperty('authors');
    expect(resGetBooks.body).toHaveProperty('books');
    expect(resGetAuthors.body.authors).toHaveLength(0);
    expect(resGetBooks.body.books).toHaveLength(0);
    done();
  });
});
