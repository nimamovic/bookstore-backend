const { Book,Author,AuthorBook } = require('../models');
const book = require('../models/book');


const postBook = async (req, res, next) => {
  if (!req.body.isbn || !req.body.title || !req.body.pages || !req.body.published || !req.body.image || 
    !Book.isISBNValid(req.body.isbn) || !Number.isInteger(req.body.published) || !Number.isInteger(req.body.pages) ||
    req.body.published > 2021  || req.body.pages < 0)
    return res.json({
       ok: false,
       message: 'Creat book not successful'
    });
  const props = {isbn: req.body.isbn, title:req.body.title, pages: req.body.pages, published: req.body.published, image: req.body.image};
  const authors = req.body.authors; 
  try {
    const bookExists = await Book.findByISBN(props.isbn);
    if(bookExists.length == 0){
      const book = await Book.create(props);
      if(book){
          if(authors){
            authors.forEach(async function (authorId) {
              creatBookAuthors(authorId,props.isbn,res);
              });
          }
          res.status(201).send(props.isbn);
        }res.status(404).send();
    }res.status(404).send();
  }
  catch(e){
      res.status(400).send(e);
  }
}

const postBookAuthor = async (req,res,next) =>{
  try{
    const book = await creatBookAuthors(req.body.author,req.params.idBook,res);
    if(!book) res.status(404).send();
    res.status(200).send();
  }
  catch(e){
    console.log(e);
    res.status(400).send(e);
}
}

const getBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    if(books){
      for(var i = 0 ; i < books.length; i++){
        const authorsOfCurrentBook = await getAllBooksAuthors({bookId: books[i].isbn});
        books[i].authors = authorsOfCurrentBook;
      }
      res.status(200).send({books});
    }
    res.status(400).send();
}
catch(e){
    console.log(e);
    res.status(400).send(e);
}
}

const getBookById = async (req, res, next) => {
  const booksISBN = req.params.id;
  try {
    const book = await Book.findByISBN(booksISBN);
    if(book){
      const authorsOfCurrentBook = await getAllBooksAuthors({bookId: booksISBN});
      if(authorsOfCurrentBook) book[0].authors = authorsOfCurrentBook;
      res.status(200).send({book});
    } res.status(400).send();
  }catch(e){
        console.log(e);
        res.status(400).send(e);
  }
}

const getBooksAuthors = async (req, res) => {
  const filter = {bookId: req.params.idBook};
  try{
    const allBookAuthors = await getAllBooksAuthors(filter);
    if(!allBookAuthors) res.status(404).send();
    res.status(200).send({authors:allBookAuthors});
  }catch(e){
    console.log(e);
    res.status(400).send(e);
  }
}

const putBook = async (req, res) => {
  const bookISBN = req.params.id;
  const props = {title:req.body.title, pages:req.body.pages, published:req.body.published,image: req.body.image};
  try{
    const book = await Book.updateBook(bookISBN,props);
    if(!book) res.status(404).send();
    res.status(200).send();
  }catch(e){
    console.log(e);
    res.status(400).send(e);
  }
}


const deleteBooksAuthor = async (req,res) => {
  const props = {bookId:req.params.idBook,authorId:req.params.idAuthor}
  try{
    const deletedAuthorBook = await AuthorBook.destroy(props);
    if(!deletedAuthorBook) res.status(404).send();
    res.status(200).send(props.idBook);
  }catch(e){
    console.log(e);
    res.status(400).send(e);
  }
}



const deleteBook = async (req, res) => {
  const isbn = req.params.id;
  try{
    const deletedBook = await Book.destroy({isbn:isbn});
    if(!deletedBook) res.status(400).send();
    else res.status(200).send();
  }catch(e){
    console.log(e);
    res.status(400).send();
  }
}
const creatBookAuthors = async (authorId, bookId,res) => {
  try{
    const author = await Author.findById(authorId);
    if(author){
      const book = await Book.findByISBN(bookId);
      if(book){
        const props = {bookId: bookId, authorId: authorId}
        const authorBook = await AuthorBook.create(props);
        if(authorBook) return 1;
      }
    }
    return 0;
  }catch(e){
    console.log(e);
        res.status(400).send(e);
  }
}
const getAllBooksAuthors = async (filter) => {
  try {
    const authors = await AuthorBook.find(filter);
    if(authors){
      let allBookAuthors = [];
      for(var i = 0; i < authors.length; i++){
        const author = await Author.find({id:authors[i].authorId});
        allBookAuthors.push(author[0]);
      }
      return allBookAuthors;
    }
    return 0;
  }catch(e){
      console.log(e);
      res.status(400).send(e);
  }
}

module.exports = {
  postBook,
  getBooks,
  getBookById,
  putBook,
  deleteBook,
  deleteBooksAuthor,
  getBooksAuthors,
  postBookAuthor
}
