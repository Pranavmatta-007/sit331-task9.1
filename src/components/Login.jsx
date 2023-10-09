import React, { useState } from 'react'
import "./LoginPage.css"
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { signInWithGooglePopup, createuserdocfromAuth,signinAuthUserWithEmailAndPassword } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LoginF = (props) => {


    const navigate = useNavigate();
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createuserdocfromAuth(user);
        navigate('/Login/Signed-in');
    }

    const [errorMessage, setErrorMessage] = useState('');

    const [contact, setContact] = useState({
        email: "",
        password: ""
    });
    const { email, password } = contact;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setContact((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    async function handleLogin(event) {
        try {
          const response = await signinAuthUserWithEmailAndPassword(
            email,
            password
          );
          if(email && password!= null)
          {
            navigate("/Login/Signed-in")
          }
          else
          {
            alert('email not registered')
          }
        } catch (error) {
          console.log("error in login", error.message);
        }
      }


    return (
        <>
            <div className='Sign-container'>
                <Link to='Sign-up'>Sign up</Link>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className='container'>
                <div className='text'>Your email</div>
                <input name='email' type="email" value={contact.email}
              onChange={handleChange}/>
            </div>
            <div className='container'>
                <div className='text'>Your password</div>
                <input name='password' type="password"value={contact.password}
              onChange={handleChange} />
            </div>
            <div className='button-container'>
                <button type='submit' onClick={handleLogin}>Login</button>
            </div>

        </>
    );
}
export default LoginF;