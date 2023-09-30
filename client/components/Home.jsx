import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import Bookcard from './Bookcard.jsx';
import AddBookCard from './AddBookCard.jsx';

const Home = (props) => {
  // const data = useParams();
  // console.log('data', data)
  const [listOfBooks, setListOfBooks] = useState([]); // Use state to manage the list of books
  const [userId, setUserId] = useState(props._id);//decodeURIComponent(data._id)
  // const [userId, setUserId] = useState("650e669a6fc15fbec77bb705");

  useEffect(() => {
    fetch(`/api/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(bookList => {
        console.log('reached bookList');
        // Use setListOfBooks to update the state with the fetched data
        setListOfBooks(bookList.books.map(book => ({
          _id: book._id,
          title: book.title,
          author: book.author,
          totalPageCount: book.totalPageCount,
          finished: book.finished,
          rating: book.rating
        })));
      });
  }, []); // Include userId in the dependency array to re-fetch when it changes

  const handleDeleteBook = (bookId) => {
    // Filter out the book with the specified _id
    setListOfBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
  };

  const handleUpdateBook = (bookId) => {
    setListOfBooks(prevBooks => prevBooks.filter(book => book._id !== bookId))
  }


  return (
    <main>
      <div className="bookCardContainer">
        {listOfBooks.map(book => (
          <Bookcard
            key={book._id} // Remember to add a unique key to each book card
            _id={book._id}
            title={book.title}
            author={book.author}
            totalPageCount={book.totalPageCount}
            finished={book.finished}
            rating={book.rating}
            onDelete={handleDeleteBook} // Pass the callback function
            onUpdate={handleUpdateBook}
          />
        ))}
        <AddBookCard userId={userId}/>
      </div>
    </main>
  );
};

export default Home;
