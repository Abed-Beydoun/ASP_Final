import './Login.css'
import React, { useState } from 'react';
import { Link   } from 'react-router-dom';
import { LeftChild , Icons , FormBtn } from '../../components/index';
import { togglePassForm, cancelAction , getUsersFromLocalStorage } from '../validationUtil';
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';




const Login = ({ handleLogin }) => {

    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const users = getUsersFromLocalStorage();


    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Check if the entered email exists in the list of registered users
        const user = users.find(user => user.email === email);
        if (!user) {
            setErrorMessage('Please register first.');
            return;
        }

        if (user.password !== password || user.email !== email) {
            setErrorMessage('Incorrect Credntials.');
            return;
        }

// Clear any previously displayed error messages
setErrorMessage('');

// Call the handleLogin function passed from the parent component
handleLogin();
        

        // Login successful, navigate to the desired page
        navigate('/'); 
       
       
       
  };
     
  return (
    <div className="login-container">


        {/* <!-- child1 section starts here --> */}
         <LeftChild className="login-child1" />
        {/* <!-- child1 section ends here --> */}


  {/* <!-- child2 section starts here --> */}
    <div className="child2 ">
            <h1>Login</h1>
            <div className="container2">
                

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="loginEmail"
              id="loginEmail"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="loginPassword"
              id="loginPassword"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
            {errorMessage && <div className="error-messages">{errorMessage}</div>}
            


            <FormBtn text="Login" />
          </form>


                <br />
               <div className="pass">
                
                <button className="forgetPass" onClick={togglePassForm} >forget password?</button>
                
                </div>

               <div className='login-or'><p>or login with </p></div>
                
                <Icons />
              
                <div><p>Don't have an account ? <Link to="/register">Register</Link></p></div>

            </div>
    </div>
    {/*  child2 section ends here */}


    {/* <!-- Forget Pass Form Starts Here --> */}
     <div id="forgetPassForm"> 
        <div class="toFlex">
        <h2>Forget Password</h2>
       <IoClose className='close-btn' onClick={togglePassForm}/>
    </div>
        <input 
        type="email"
         name="" 
         id=""
        placeholder="enter your email"
          />
        <div><button onClick={togglePassForm}>Submit</button></div>
    </div> 
     {/* <!-- Forget Pass Form Ends Here --> */}

     <div class="overlay" id="overlay" onClick={cancelAction}></div>

</div>

  );
};



export default Login;
