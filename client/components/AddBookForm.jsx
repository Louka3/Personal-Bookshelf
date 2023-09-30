import React, { useState } from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';


const AddBookForm = (props) => {
  const [formData, setFormData] = useState({
    title: undefined,
    author: undefined,
    totalPageCount: undefined,
    finished: undefined,
    rating: undefined,
  });

  const navigate = useNavigate();
  const { userId } = useParams();

  const handleBtnClick = () => {
    const { title, author, totalPageCount, finished, rating } = formData;
  
    const dataToSend = {
        userId,   
        title,
        author,
        totalPageCount,
        finished,
        rating
    }

    fetch('/api/book', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => navigate(`/home`))
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleBtnClick(); // Call the handleBtnClick function when the form is submitted
  };

  const handleChange = (e) => {
    // This function handles changes in form inputs and updates the formData state
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="update-form">
      <div className="form-group">
        <label htmlFor="title">
          Title:{" "}
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="author">
          Author:{" "}
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="totalPages">
          Total Pages:{" "}
          <input
            type="text"
            placeholder="Total Pages"
            name="totalPageCount"
            value={formData.totalPageCount}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="finished">
          Finished:{" "}
          <input
            type="text"
            placeholder="Yes/No"
            name="finished"
            value={formData.finished}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="rating">
          Rating (1-10):{" "}
          <input
            type="text"
            placeholder="Rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <button type="submit" className="form-submission-btn">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddBookForm;