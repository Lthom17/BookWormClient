import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
//import AuthContext from "../context/AuthContext";
//import jwtDecode from "jwt-decode";
import M from "materialize-css";

import "./Styles/Login.css"

function Register() {

    //const [userState, setUserState] = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const bookUser = {
            "username" : `${username}`,
            "password" : `${password}`,
            "email" : `${email}`,
            "first_name" : `${firstName}`,
            "last_name" : `${lastName}`,
        }

        console.log(bookUser);

        const response = await fetch("http://localhost:8080/api/member", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookUser),
        });

        if (response.status === 201) {
            console.log("success")
            M.toast({html: 'Account Created, you may now login!', classes: 'rounded'});
            history.push("/login");
        } else if (response.status === 400) {
            const errors = await response.json();
            console.log(errors)
        } else if (response.status === 403) {
            console.log("Login failed.");
        } else {
            console.log("Unknown error.");
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value)
    }

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }

    const updateFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const updateLastName = (e) => {
        setLastName(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <>
            <div className="page-label container">
                <h2 className="center-align">Register</h2>
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
                        <label htmlFor="email" className="text-muted">Email </label>
                        <input id="email" className="form-control" onChange={(e) => updateEmail(e)}></input>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-6 offset-3">
                        <label htmlFor="firstName" className="text-muted">First name (optional) </label>
                        <input id="firstName" className="form-control" onChange={(e) => updateFirstName(e)}></input>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-6 offset-3">
                        <label htmlFor="lastName" className="text-muted">Last name (optional) </label>
                        <input id="lastName" className="form-control" onChange={(e) => updateLastName(e)}></input>
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

export default Register;