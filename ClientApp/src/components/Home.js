import React, { useState, useEffect } from 'react';
import BookTable from './BookTable';
import AddBookForm from './AddBookForm';
import {BookApi} from '../api/books';

const Home = () => {
    const bookData = [
        { bookId: 0, bookName: null, authorName: null }];
    const [hasError, setErrors] = useState(false);
    const [books, setBooks] = useState(bookData);

    const addBook = book => {
        //book.bookId = books.length + 1
        //setBooks([...books, book])

        addBook("api/book/create", book)
            .then(data => console.log(JSON.stringify(data)))
            .catch(error => console.error(error));

        function addBook(url = '', data = {}) {
            return fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                //.then(setBooks(data));
        }
        console.log("book has been added");
    }

    const delBook = id => {
        deleteBook(id);

        function deleteBook(id) {
            return fetch(`api/book/delete/${id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                },
            })
                .then(res => {
                    console.log('Deleted:', res.message)
                    return res
                })
                .catch(err => console.error(err))
        }
    }

    async function getBooks() {
        const res = await fetch("api/books");
        res.json()
            .then(res => setBooks(res))
            .catch(err => setErrors(err));
        console.log("get all books", res);
    }

    function redirectToList() {
      //  location.href = '/books'
    }

    useEffect(() => {
        getBooks();
    });

    return (
        
        <div>
            <AddBookForm addBook={addBook}/>
            <hr />
            
            <BookTable books={books} deleteBook={delBook}/>
            <hr />
            
            <span>{console.log(JSON.stringify(books))}</span>
            <span>{console.log(" Has error: ", JSON.stringify(hasError))}</span>
        </div>
        )
}

export default Home;