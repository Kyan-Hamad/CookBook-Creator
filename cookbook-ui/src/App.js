import './App.css';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './WebPages/HomePage';
import Login from "./WebPages/Login";
import Register from "./WebPages/Register";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from './Components/Loading/Loading';
import DashBoard from './WebPages/DashBoard';
import Profile from './WebPages/Profile';
import NewBookForm from '../src/Components/NewBookForm';
import BookDetails from './Components/BookDetails'; // Updated import statement

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  console.log("Authentication State: ", isAuthenticated);

  if (isLoading) {
    return (
      <Loading/>
    )
  }

  return (
    <>
    <div>
      <BrowserRouter>
        <Navbar />
        {/* Routes represent page routes "/" represents the default page route that we would refer to as the home page */}
        
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <DashBoard /> : <HomePage />} />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <HomePage />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new-book" element={<NewBookForm />} />
          <Route path="/books/:title" element={<BookDetails />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  </>
);
}

export default App;
