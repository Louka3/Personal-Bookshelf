import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import UpdateForm from './UpdateForm.jsx';
import AddBookForm from './AddBookForm.jsx';
import LoginForm from './LoginForm.jsx';


const App = () => {
    const [username, setUsername] = useState("");
    const [_id, set_id] = useState("")
    return(
    <div className="App">
        <Header username={username} />
            <Routes>
                <Route path="/home" element={<Home _id={_id}/>}></Route>
                <Route path="/updateForm/:_id" element={<UpdateForm />}></Route>
                <Route path="/addBookForm/:userId" element={<AddBookForm />}></Route>
                <Route path="/" element={<LoginForm username={username} setUsername={setUsername} set_id={set_id}/>}></Route>
            </Routes>
        <Footer />
    </div> 
  );	
};


export default App;