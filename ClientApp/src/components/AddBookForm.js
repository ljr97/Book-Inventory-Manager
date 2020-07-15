import React, { useState } from 'react';


const AddBookForm = props => {

    const initialFormState = { bookName: '', authorName: '' }
    const [book, setBook] = useState(initialFormState);


    const handleInputChange = event => {
        const { name, value } = event.target
        setBook({ ...book, [name]: value })
        console.log("handleInput: ", book);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!book.bookName || !book.authorName) return
        console.log("book object:", book);
        props.addBook(book);
        setBook(initialFormState);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label id="textbx">Book name: </label>
            <input type="text" name="bookName" value={book.bookName} onChange={handleInputChange} />
            <label id="textbx">Author name: </label>
            <input type="text" name="authorName" value={book.authorName} onChange={handleInputChange} />
            <button class="button">Add new book</button>
        </form>
    )
}

export default AddBookForm