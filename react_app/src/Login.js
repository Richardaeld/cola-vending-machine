import {useRef, useState, useEffect, useContext} from 'react';
import AuthContext from './context/AuthProvider';

export default function Login (props) {
    const {setAuth} = useContext(AuthContext);
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
        // setUser('');
        // setPass('');
        setSuccess(true);
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
                Already Registered?<br />
                <span className="line">
                    <a href="#">Sign In</a>
                </span>
            </p>

        </section>
                    )}
                    </>
    )
}