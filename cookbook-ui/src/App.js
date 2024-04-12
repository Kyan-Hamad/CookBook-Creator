import './App.css';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './WebPages/HomePage';
import Login from "./WebPages/Login";
import Register from "./WebPages/Register";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from './Components/Loading/Loading';
import DashBoard from './WebPages/DashBoard';
import Profile from './WebPages/Profile';
import NewBookForm from '../src/Components/NewBookForm';
import BookDetails from '../src/Components/BookDetails'; 
import PageDetails from '../src/Components/PageDetails'; // Import PageDetails component

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  // Handle loading state
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <DashBoard /> : <HomePage />} // Render Dashboard if authenticated, otherwise HomePage
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <HomePage />} // Render Profile if authenticated, otherwise HomePage
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-book" element={<NewBookForm />} />
            <Route path="/books/:title" element={<BookDetails />} /> {/* Route for BookDetails */}
            <Route path="/books/:title/:pageId" element={<PageDetails />} /> {/* Route for PageDetails with page ID */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
