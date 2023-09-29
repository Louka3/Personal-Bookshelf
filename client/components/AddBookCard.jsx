import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

import AddBookForm from "./AddBookForm.jsx";

const AddBookCard = (props) => {
    const [userId, setUserId] = useState(props.userId);
    
    const navigate = useNavigate();
    
    const handleOnClick = () => {
        navigate(`/addBookForm/${userId}`)
    }
    

    return (
        <div className="add-book-card">
            <button onClick={handleOnClick}>
                <span className="add-book-span">Add Book</span><br /><br /> 
                <span className="add-book-plus">+</span>
            </button> 
        </div>
    )


}


export default AddBookCard;