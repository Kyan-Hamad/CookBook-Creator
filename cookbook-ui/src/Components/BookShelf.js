import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from './Book';
import { Link } from 'react-router-dom'; 
import Modal from 'react-modal';
import '../Styles/BookShelf.css';

const BookShelf = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [bookTitleToDelete, setBookTitleToDelete] = useState('');

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://s6sdmgik6l.execute-api.us-east-1.amazonaws.com/Prod/api/books'); 
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDeleteBook = async () => {
    if (bookToDelete) {
      try {
        console.log('Deleting book with ID:', bookToDelete);
        await axios.delete(`https://s6sdmgik6l.execute-api.us-east-1.amazonaws.com/Prod/api/books/${bookToDelete}`);
        fetchBooks();
        closeModal();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const openModal = (bookId, bookTitle) => {
    setBookToDelete(bookId);
    setBookTitleToDelete(bookTitle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBookToDelete(null);
    setBookTitleToDelete('');
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="book-shelf">
      {books.length === 0 ? <p>No books available</p> :
        books.map((book) => (
          <div id="book-and-delete" key={book._id}>
            <Link to={`/books/${book.title}`}>
              <Book
                title={book.title}
                imagePath={book.imagePath ? `${book.imagePath}` : 'https://kyan-hamad.github.io/RPG-Game/CookBook-Maker-Logo.png'}
              />
            </Link>
            <div>
              <button className="delete-button" onClick={() => openModal(book._id, book.title)}>Delete</button>
            </div>
          </div>
        ))
      }

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        ariaHideApp={false}
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete "{bookTitleToDelete}"?</p>
        <button className="modal-button confirm" onClick={handleDeleteBook}>Yes, Delete</button>
        <button className="modal-button cancel" onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
}

export default BookShelf;
