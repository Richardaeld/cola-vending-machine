// import {useRef, useState, useEffect, useContext} from 'react';
import {useRef, useState, useEffect} from 'react';
// import AuthContext from '../../../context/AuthProvider';
import useAuth from '../../../hooks/useAuth';

import axios from '../../../api/axios'
const LOGIN_URL = '/user/auth/login'

export default function Login (props) {
    // const {setAuth} = useContext(AuthContext);
    const {setAuth} = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pass])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pass);

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({username:user, password:pass}),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;

            setAuth({user, pass, roles, accessToken})

            // setUser('');
            // setPass('');
            setSuccess(true)

        } catch (err) {

            if(!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }

;
    }


    return (

        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                    required
                />

                <button>Sign In</button>
            </form>

            <p>
                Need to  Register?<br />
                <span className="line">
                    <a href="register">Register</a>
                </span>
            </p>

            <p>
                Back to the Vending Machine?<br />
                <span className="line">
                    <a href="/">Back</a>
                </span>
            </p>

        </section>
                    )}
                    </>
    )
}