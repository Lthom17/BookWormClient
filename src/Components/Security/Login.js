import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../Context/UserContext";
import jwtDecode from "jwt-decode";
import M from "materialize-css";

import './Styles/Login.css'

function Login() {

    const [currentUser, setCurrentUser] = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/api/security/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (response.status === 200) {
            const { jwt_token } = await response.json();

            setCurrentUser({user: jwtDecode(jwt_token)});

            localStorage.setItem("token", jwt_token);

            M.toast({html: 'Login Successful', classes: 'rounded'});

            history.push("/");
        } else if (response.status === 400) {
            const errors = await response.json();
            console.log(errors)
        } else if (response.status === 403) {
            M.toast({html: 'Login Failed', classes: 'rounded'});
        } else {
            console.log("Unknown error.");
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <>
            <div className="page-label container">
                <h2 className="center-align">Login</h2>
            </div>

            <form className="login-form" onSubmit={handleLoginSubmit}>
                <div className="form-group row">
                    <div className="col-6 offset-3">
                        <label htmlFor="username" className="text-muted">Username </label>
                        <input id="username" className="form-control" onChange={(e) => updateUsername(e)}></input>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-6 offset-3">
                        <label htmlFor="password" className="text-muted">Password </label>
                        <input id="password" type="password" className="form-control" onChange={(e) => updatePassword(e)}></input>
                    </div>
                </div>
                <div className="row">
                    <button type="submit" className="btn submit right">Submit</button>
                </div>
            </form>
        </>
    )
}

export default Login;