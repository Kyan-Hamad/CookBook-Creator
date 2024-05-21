import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './WebPages/HomePage';
import Login from "./WebPages/Login";
import Register from "./WebPages/Register";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashBoard from './WebPages/DashBoard';
import NewBookForm from '../src/Components/NewBookForm';
import BookDetails from '../src/Components/BookDetails'; 
import PageDetails from '../src/Components/PageDetails'; 


Amplify.configure(config);

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route 
            path="/" 
            element={withAuthenticator ? <DashBoard/> : <HomePage/>}/>
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-book" element={<NewBookForm />} />
            <Route path="/books/:title" element={<BookDetails />} /> 
            <Route path="/books/:title/:pageId" element={<PageDetails />} /> 
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default withAuthenticator(App);