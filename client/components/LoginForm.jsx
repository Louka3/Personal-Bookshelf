import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  }); 
  
  const navigate = useNavigate();
    
  const handleLoginOnClick = async (event) => {
      event.preventDefault();
      console.log('Button clicked')
      console.log(formData.username)
      console.log(formData.password)
      const url = 'http://localhost:3000/users/' + formData.username + '/' + formData.password;
      fetch(url, { //tester/test
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Set appropriate headers
          // Add other headers if needed
        },
      })
      .then(response => response.json()) // You were missing the parentheses here
      .then(data => {
        if (data) { // Check if data is truthy
          props.setUsername(formData.username);
          props.set_id(data._id);
          navigate('/home');
        } else {
          // Handle the case when data is falsy (user not found or error)
          // You might want to display an error message to the user
        }
      })
      .catch(error => {
        // Handle any network or fetch errors here
        console.error("Fetch Error:", error);
      });
    };
    // somethings wrong here
  const handleSignupOnClick = async (event) => {
    event.preventDefault();
    console.log('Button clicked')
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        newUser: {
          username: formData.username,
          password: formData.password
        }
      },

    })
    .then(response => response.json())
    .then(data => {
      props.setUsername(formData.username)
      props.set_id(data._id)
      navigate('/home')
    })
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
      <form action="" className="login-container">
        <div className="form-group username-form-group">
          <label htmlFor="username" className="login-username-label">
            Username: 
            <input type="text" className="login-username-input" name="username" onChange={handleChange}/>
          </label>
        </div>
        <div className="form-group password-form-group">
          <label htmlFor="password" className="login-password-label">
            Password:
            <input type="password" className="login-password-input" name="password" onChange={handleChange}/>
          </label>
        </div>
        <div className="form-group btns-form-group">
          <button className="login-btn" onClick={handleLoginOnClick}>
            Login
          </button>
          <button className="signup-btn" onClick={handleSignupOnClick}>
            Sign Up
          </button>
        </div>
      </form>
  )
}

export default LoginForm;