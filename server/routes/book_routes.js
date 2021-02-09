const router = require('express').Router();
const verifyToken = require('../middleware/verify_token');
const {
  postBook,
  getBooks,
  getBookById,
  putBook,
  deleteBook,
  deleteBooksAuthor,
  getBooksAuthors,
  postBooksAuthor
} = require('../controllers/book_controller');
    

router.route('/books')
  .get(getBooks)
  .post(verifyToken,postBook);

router.route('/books/:id')
  .get(getBookById)
  .put(verifyToken,putBook)
  .delete(verifyToken,deleteBook);

router.route('/books/:idBook/authors/:idAuthor')
  .delete(verifyToken,deleteBooksAuthor);

router.route('/books/:idBook/authors')
  .get(getBooksAuthors)
  .post(verifyToken,postBooksAuthor);

module.exports = router;