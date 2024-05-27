import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import DashBoard from './WebPages/DashBoard';
import NewBookForm from '../src/Components/NewBookForm';
import BookDetails from '../src/Components/BookDetails'; 
import PageDetails from '../src/Components/PageDetails'; 
import { UserProvider } from "./contexts/user.context";
import Home from "./WebPages/HomePage";
import Login from "./pages/Login.page";
import PrivateRoute from "./pages/PrivateRoute.page";
import Signup from "./pages/Signup.page";

function App() {
  return (
        <>
          <div>
            <BrowserRouter>
            <UserProvider> {/* This is the user context provider. */}
              <Navbar />
              <Routes>                  
                <Route exact path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<PrivateRoute />}> {/* Routes within here are only accessible when logged in */}
                  <Route path="/" element={<DashBoard />} />
                  <Route path="/dashboard" element={<DashBoard/>} />
                  <Route path="/new-book" element={<NewBookForm />} />
                  <Route path="/books/:title" element={<BookDetails />} /> 
                  <Route path="/books/:title/:pageId" element={<PageDetails />} /> 
                </Route>  
              </Routes>
            </UserProvider>
            </BrowserRouter>
          </div>
        </>
      )}

export default App;
