import {useRef, useState, useEffect} from "react";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,25}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,25}$/;

export default function Register (props) {

    const userRef = useRef();
    const effRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pass, setPass] = useState('');
    const [validPass, setValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    const [matchPass, setMatchPass] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, SetSuccess] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PASS_REGEX.test(pass);
        console.log(result);
        console.log(pass);
        setValidPass(result);
        const match = pass === matchPass;
        setValidMatch(match);
    }, [pass, matchPass])

    useEffect(() => {
        setErrMsg('');
    }, [user, pass, matchPass])

    return (
        <section>
            <p ref={effRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
            </p>
            <h2>Register</h2>
            <form>
                {/* username */}
                <label htmlFor="username">
                    Username
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onChange={(e) => setUser(e.target.value)}
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        required
                    />

                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4-26 Characters. <br />
                    Must begin with a letter. <br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>

                {/* password */}
                <label htmlFor="password">
                    Password
                    <span className={validPass ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPass || !pass ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                        type="password"
                        id="password"
                        aria-invalid={validPass ? "false" : "true"}
                        aria-describedby="passnote"
                        onChange={(e) => setPass(e.target.value)}
                        onFocus={() => setPassFocus(true)}
                        onBlur={() => setPassFocus(false)}
                        required
                    />

                <p id="passnote" className={passFocus && !validPass ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8-26 Characters. <br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters:
                    <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span>
                    <span aria-label="hashtag">#</span>
                    <span aria-label="dplar sign">$</span>
                    <span aria-label="percent">%</span>
                </p>

                {/* password confirm */}
                <label htmlFor="confirm_pass">
                    Confirm Password
                    <span className={validMatch && matchPass ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validMatch || !matchPass ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                        type="password"
                        id="confirm_pass"
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onChange={(e) => setMatchPass(e.target.value)}
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        required
                    />

                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password. <br />
                </p>

                <button disabled={!validName || !validPass || !validMatch ? true : false}>
                    Register
                </button>

            </form>
        </section>
    )
}