const { Author,Book, AuthorBook } = require('../models');

const postAuthor = async (req, res, next) => {
  var date = new Date(req.body.dob);
  if (!req.body.first_name || !req.body.last_name || !date || !req.body.image) 
    res.json({
       ok: false,
       message: 'Creat author not successful'
    });
  const props = {id: Author.create_UUID(),first_name:req.body.first_name, last_name:req.body.last_name, dob:date,image: req.body.image};
  const propsBooks = req.body.books;
  try {
    const author = await Author.create(props);
    if(propsBooks){
      if(propsBooks){
        propsBooks.forEach(async function (bookId) {
          await createAuthorsBook(bookId,props.id,res);
          });
      }
      res.status(201).send(author.id);
    }else res.status(404).send();
  }
  catch(e){
    console.log(e);
    res.status(400).send(e);
  }
}

const postAuthorsBook = async (req,res) => {
  const authorId = req.params.idAuthor;
  const bookId = req.body.book;
  try{
    const allredyExistsBookAuthor = await AuthorBook.find({bookId: bookId, authorId: authorId});
    if(allredyExistsBookAuthor.length == 0){
      const authorsBook = await createAuthorsBook(bookId,authorId,res);
      if(authorsBook) res.status(200).send();
    }res.status(404).send();
  
  }
  catch(e){
    console.log(e);
      res.status(400).send(e);
  }
}


const getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.findAll();
    if(authors){
      for(let i = 0 ; i < authors.length; i++){
        const booksOfCurrentAuthor = await getAllAuthorsBooks({authorId: authors[i].id});
        if(booksOfCurrentAuthor) authors[i].books = booksOfCurrentAuthor;
      }
      res.status(200).send({authors});
    }
    else res.status(400).send();
  }
  catch(e){
      console.log(e);
      res.status(400).send(e);
  }
}

const getAuthorById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const author = await Author.findById(id);
    if(author){
        const booksOfCurrentAuthor = await getAllAuthorsBooks({authorId: author[0].id});
        if(booksOfCurrentAuthor){
          author[0].books = booksOfCurrentAuthor;
        }
        res.status(200).send({author});
    }
    res.status(404).send();
  }
  catch(e){
      console.log(e);
      res.status(400).send(e);
  }
}
const getAuthorsBooks = async (req, res, next) => {
  const filter = {authorId: req.params.idAuthor};
  try {
    const allAuthorsBooks = await getAllAuthorsBooks(filter);
    if(allAuthorsBooks){
      res.status(200).send({books:allAuthorsBooks});
    }
    else res.status(400).send();
  }
  catch(e){
      console.log(e);
      res.status(400).send(e);
  }
}

const putAuthor = async (req, res, next) => {
  const id = req.params.id;
  const props = {id:req.body.id, first_name:req.body.first_name, last_name:req.body.last_name,image: req.body.image};
  var date = "";
  if(req.body.dob) date = new Date(req.body.dob);
  if(date != "") props['dob'] = date;
  const books = req.body.books; 
  try {
    const author = await Author.update(id,props);
    if(!author) res.status(404).send();
    res.status(200).send();
  }
  catch(e){
    console.log(e);
    res.status(400).send(e);
  }
}
const deleteAuthorsBook = async (req,res) => {
  const bookId = req.params.idBook;
  const authorId = req.params.idAuthor;
  try{
    const deleted = await AuthorBook.destroy({bookId: bookId,authorId:authorId});
    if(!deleted) res.status(404).send();
    res.status(200).send();
  }
  catch(e){
    console.log(e);
    res.status(400).send(e);
  }
}

const deleteAuthor = async (req, res, next) => {
  const id = req.params.id;
  try{
    const deletedAuthor = await Author.destroy({id:id});
    if(!deletedAuthor) res.status(404).send();
    res.status(200).send();
    }
  catch(e){
    console.log(e);
    res.status(400).send();
  }
}
const createAuthorsBook = async (bookId,authorId,res) =>{
  try{
    const author = await Author.find({id: authorId});
    if(author.length != 0){
      const book = await Book.findByISBN(bookId);
      if(book.length != 0){
        const propsAuthorBook = {bookId: book[0].isbn, authorId: authorId};
        const authorBook = await AuthorBook.create(propsAuthorBook);
        if(authorBook) return 1;
      } 
    } 
    return 0;
  }catch(e){
    console.log(e);
    res.status(400).send(e);
  }
}

const getAllAuthorsBooks = async (filter) => {
  try {
    const books = await AuthorBook.find(filter);
    if(books){
      let allBooks = [];
      for(let i = 0; i < books.length; i++){
        const book = await Book.findByISBN(books[i].bookId);
        if(book) allBooks.push(book[0]);
      }
      return allBooks;
    }
  }
  catch(e){
      console.log(e);
      res.status(400).send(e);
  }
}

module.exports = {
  postAuthor,
  getAuthors,
  getAuthorById,
  putAuthor,
  deleteAuthor,
  deleteAuthorsBook,
  getAuthorsBooks,
  postAuthorsBook
}

