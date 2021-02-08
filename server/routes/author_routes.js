const router = require('express').Router();
const verifyToken = require('../middleware/verify_token');
const {
    postAuthor,
    getAuthors,
    getAuthorById,
    putAuthor,
    deleteAuthor,
    deleteAuthorsBook,
    getAuthorsBooks,
    postAuthorsBook
} = require('../controllers/author_controller');

router.route('/authors')
  .post(verifyToken,postAuthor)
  .get(getAuthors);

router.route('/authors/:id')
  .get(getAuthorById)
  .put(verifyToken,putAuthor)
  .delete(verifyToken,deleteAuthor);

router.route('/authors/:idAuthor/books/:idBook')
  .delete(verifyToken,deleteAuthorsBook);

router.route('/authors/:idAuthor/books')
  .get(getAuthorsBooks)
  .post(verifyToken,postAuthorsBook);

module.exports = router;