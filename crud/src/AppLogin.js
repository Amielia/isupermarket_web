import React, { useState, useEffect} from 'react';
import firebase from './Config';
// import fire from "./fire";
// import fire from "./fire";
import "./Apps.css";
import Login from "./Components/Login";
import App from "./App.js"; 
import 'firebase/auth';
// import Hero from "./Hero";


const AppLogin = () => {
    const [user, setUser] = useState ("");
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");
    const [emailError, setEmailError] = useState ("");
    const [passwordError, setPasswordError] = useState ("");
    const [hasAccount, setHasAccount] = useState (false);


const clearInputs = () => {
    setEmailError("");
    setPasswordError ("");
};

const clearErrors = () => {
    setEmailError("");
    setPassword("");
};

const handleLogin = () => {
    if(email=="psak1@gmail.com" && password=="psak12345")
    {
    clearErrors();
    firebase
    .auth()
    .signInWithEmailAndPassword(email,password)
    .catch(err =>{
        switch(err.code)
        {
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
                setEmailError(err.message);
                break;
                case "auth/wrong-password":
                    setPasswordError(err.message);
                    break;
        }
    });
    alert("Welcome Admin");
    }
    else
    if(email!="psak1@gmail.com" || password!="psak12345")
    {
    alert("Wrong email & password or Are you are an admin?");
    // alert("Unsuccessful login @ you are not admin");
    }
};


    const handleSignup = () => {
        clearErrors();
        firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch((err) => {
            switch (err.code){
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(err.message);
                    break;
                case "auth/weak-password":
                    setPasswordError(err.message);
                    break;
            }
        });
    };
        const handleLogout = () => {
            firebase.auth().signOut();
        };

        const authListener = () => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    clearInputs();
                    setUser(user);
                } else {
                    setUser("");
                }
             });
        };

    useEffect(() => {
        authListener();
    }, []);

    return (
        <div className="AppLogin">
            {user ? (
                <App/>
            ) : (
            <Login 
            email={email} 
            setEmail={setEmail} 
            password={password} 
            setPassword={setPassword} 
            handleLogin={handleLogin} 
            handleSignup={handleSignup} 
            hasAccount={hasAccount} 
            setHasAccount={setHasAccount} 
            emailError={emailError} 
            passwordError={passwordError}
            />
            )}
        </div>
    )
}
export default AppLogin;

