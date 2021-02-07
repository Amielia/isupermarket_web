import React from 'react';
// import Apps from './Apps';

const Login = (props) => {

    const {
        email, 
        setEmail, 
        password, 
        setPassword, 
        handleLogin, 
        handlesSignup, 
        hasAccount, 
        setHasAccount, 
        emailError, 
        passwordError} = props;

    return(
        <section className = "login">
            <div className= "loginContainer">
                <label>Username</label>
                <input type="text" 
                autoFocus 
                required
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input type="password" required value={password} 
                onChange={e => setPassword(e.target.value)} />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                            <button onClick = {handleLogin}>Sign In</button>
                            <p>Don't have an account? Contact Admin</p>
                        </>
                    ) 
                    : (
                        <>
                            <button onClick = {handleLogin}>Sign In</button>
                            <p>Not an Admin? Proceed to Customer</p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
};
export default Login;