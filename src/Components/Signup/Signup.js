import React, { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../store/Context";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [phoneNumErr, setPhoneNumErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const { auth, db } = useContext(FirebaseContext);

  const validateUsername = (name) => {
    if (!name || !/^[a-zA-Z]+$/.test(name)) {
      setUsernameErr("Username must contain only letters");
      return false;
    }
    setUsernameErr("");
    return true;
  };

  const validateEmail = (email) => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailErr("Invalid email address");
      return false;
    }
    setEmailErr("");
    return true;
  };

  const validatePhoneNum = (phone) => {
    if (!phone || phone.length !== 10) {
      setPhoneNumErr("Phone number must be 10 digits");
      return false;
    }
    setPhoneNumErr("");
    return true;
  };

  const validatePassword = (password) => {
    if (!password || password.length < 8) {
      setPasswordErr("Password must be at least 8 characters");
      return false;
    }
    setPasswordErr("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      validateUsername(username) &&
      validateEmail(email) &&
      validatePhoneNum(phoneNum) &&
      validatePassword(password)
    ) {
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        if (result) {
          const user = result.user;
          await updateProfile(user, { displayName: username });
          await addDoc(collection(db, "users"), {
            id: user.uid,
            name: username,
            phone: phoneNum
          }).then((respose)=>{
            alert("Your registration completed successfully ,Please Login")
          navigate('/login');
          }).catch((error)=>{
            alert("Email  or password is invalied")
          })
         
        }
      } catch (error) {
        console.error("Error signing up or adding user to Firestore: ", error);
      }
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              validateUsername(e.target.value);
            }}
            id="fname"
            name="name"
          />
          <br />
          {usernameErr && <small className="error">{usernameErr}</small>}
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            id="email"
            name="email"
          />
          <br />
          {emailErr && <small className="error">{emailErr}</small>}
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phoneNum}
            onChange={(e) => {
              setPhoneNum(e.target.value);
              validatePhoneNum(e.target.value);
            }}
            id="phone"
            name="phone"
          />
          <br />
          {phoneNumErr && <small className="error">{phoneNumErr}</small>}
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          />
          <br />
          {passwordErr && <small className="error">{passwordErr}</small>}
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
