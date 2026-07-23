import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { signInUser, resetPassword } from '../firebase';
import { AuthContext } from '../AuthContext';
import AppHelmet from '../components/AppHelmet';
import { NavLink } from 'react-router-dom'

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetStatus, setResetStatus] = useState('');
    const [resetError, setResetError] = useState('');
    const { currentUser } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        signInUser(email, password, setError);
    }

    const handleReset = (e) => {
        e.preventDefault();
        setResetError('');
        setResetStatus('');
        if (!resetEmail) {
            setResetError('Please enter your email address.');
            return;
        }
        resetPassword(resetEmail, setResetStatus, setResetError);
    }

    useEffect(() => {
      currentUser && window.history.back()
      error && setTimeout(() => {
        setError(null);
      }, 2000);
    }, [error, currentUser]);

    useEffect(() => {
      resetStatus && setTimeout(() => setResetStatus(''), 6000);
    }, [resetStatus]);

    useEffect(() => {
      resetError && setTimeout(() => setResetError(''), 4000);
    }, [resetError]);

    useLayoutEffect(() => {
      window.scrollTo(0, 0)
    });

    return (
        <div className='login'>
            <AppHelmet title={"Login"} location={'/login'}/>
            {!showReset ? (
                <form onSubmit={handleSubmit}>
                    <h2>Welcome Back</h2>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter email' required/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' required/>
                    <button type="submit" title="login" className='btn' aria-label="login">LOGIN</button>
                    {
                        error && <h4 className='error'>{error}Try again</h4>
                    }
                    <button type="button" className="reset-link" onClick={() => setShowReset(true)}>Forgot password?</button>
                    <div className="text">Don't have an account?&emsp;|&emsp;<NavLink to='/register'>Sign Up &raquo;</NavLink>  </div>
                </form>
            ) : (
                <form onSubmit={handleReset}>
                    <h2>Reset Password</h2>
                    <p className="reset-hint">Enter your email and we'll send you a link to reset your password.</p>
                    <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder='enter email' required/>
                    <button type="submit" className='btn' aria-label="send reset link">SEND RESET LINK</button>
                    {resetStatus && <h4 className='success'>{resetStatus}</h4>}
                    {resetError && <h4 className='error'>{resetError}</h4>}
                    <button type="button" className="reset-link" onClick={() => { setShowReset(false); setResetStatus(''); setResetError(''); }}>
                        Back to login
                    </button>
                </form>
            )}
        </div>
    );
};
