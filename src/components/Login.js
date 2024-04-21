import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { auth, googleProvider, facebookProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
    const logGoogleUser = () =>{
        signInWithPopup(auth, googleProvider)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
        }
    
    const logFacebookUser = () =>{
      signInWithPopup(auth, facebookProvider)
      .then((data) => {
        console.log(data);
      }).catch((err)=>{
        console.log(err.message)
      });
    }

  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to UniChat!</h2>
        <div
          className="login-button google"
          onClick={logGoogleUser}>
          <GoogleOutlined /> Sign In with Google
        </div>
        <br />
        <br />
        <div
          className="login-button facebook"
          onClick={logFacebookUser}>
          <FacebookOutlined /> Sign In with Facebook
        </div>
      </div>
    </div>
  );
}

export default Login;