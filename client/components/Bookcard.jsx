import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import UpdateForm from './UpdateForm.jsx';


const Bookcard = (props) => {
  const {title, author, totalPageCount, finished, rating} = props;
  const [_id, set_Id] = useState(props._id);
  const [userId, setuserId] = useState(props.userId);
  
  const navigate = useNavigate();

  const handleUpdateOnClick = () => {
    navigate(`/updateForm/${_id}`);
  }

  const handleDeleteOnClick = () => {
    fetch('/api/book',{
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "_id": _id
      })
    })
    .then(data => data.json())
    .then(data => {
        console.log(data);
        props.onDelete(_id)
    })
  }  

  return(
    <div className="bookCard">
      <p className="title">{title}</p>
      <p className="author">{author}</p>
      <p className="totalPageCount">Pages: {totalPageCount}</p>
      <p className="finished">Finished: {finished}</p>
      <p className="rating">Rating(1-10): {rating}</p>
      <div className="bookCard-btn-container">
        <button className="update-book-btn" onClick={handleUpdateOnClick}>Update</button>
        <button className="delete-book-btn" onClick={handleDeleteOnClick}>Delete</button>
      </div>
    </div>
  )
}

export default Bookcard;