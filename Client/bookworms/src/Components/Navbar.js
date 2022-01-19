import { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import jwtDecode from "jwt-decode";

import AuthContext from "../Context/UserContext"
import "./Styles/Navbar.css"

function Navbar() {

    const [search, setSearch] = useState("");

    const history = useHistory();

    const [currentUser, setCurrentUser] = useContext(AuthContext);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setCurrentUser({ user: jwtDecode(token) });
        }
    }, [setCurrentUser]);

    const updateSearch = (e) => {
        setSearch(e.target.value);
    }

    const onSearchSubmit = (e) => {
        //e.preventDefault();

        history.push(`/search/${search}`);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setCurrentUser();
    }

    return (
        <nav className="blue lighten-2">
            <div className="nav-wrapper">
                <a href="/" className="brand-logo">Bookworms</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down valign-wrapper">
                    <li>
                        <form onSubmit={(e) => onSearchSubmit(e)}>
                            <div className="input-field">
                                <i className="material-icons prefix">search</i>
                                <input id="search" type="text" onChange={updateSearch} />
                            </div>
                        </form>
                    </li>


                    {currentUser?.user ? (
                        <>
                            <li><Link to="/library">Library</Link></li>
                            {/* Removed from current project */}
                            {/* <li><Link to="/group">Groups</Link></li> */}
                            <li><Link to="/" onClick={logout}>Logout: {currentUser?.user.sub}</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                    )}

                </ul>
            </div>
        </nav>
    )
}

export default Navbar;