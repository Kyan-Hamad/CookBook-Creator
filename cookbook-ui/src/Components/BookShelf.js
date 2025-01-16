import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Book from './Book';
import { Link } from 'react-router-dom'; 
import Modal from 'react-modal';
import { UserContext } from '../contexts/user.context';
import '../Styles/BookShelf.css';

const BookShelf = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [bookTitleToDelete, setBookTitleToDelete] = useState('');
  const { user } = useContext(UserContext);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books', {
        params: { userID: user.id }
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDeleteBook = async () => {
    if (bookToDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${bookToDelete}`, {
          params: { userID: user.id }
        });
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
    if (user) {
      fetchBooks();
    }
  }, [user]);

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
