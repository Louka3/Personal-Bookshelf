import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './Home.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import UpdateForm from './UpdateForm.jsx';
import AddBookForm from './AddBookForm.jsx';

const App = () => {
  return(
    <div className="App">
        <Header />
            <Routes>
                <Route path="/" element={<Home userId=""/>}></Route>
                <Route path="/updateForm/:_id" element={<UpdateForm />}></Route>
                <Route path="/addBookForm/:userId" element={<AddBookForm />}></Route>
            </Routes>
        <Footer />
    </div>
  );	
};


export default App;