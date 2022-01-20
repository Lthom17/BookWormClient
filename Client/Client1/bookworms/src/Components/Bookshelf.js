import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import './Styles/Bookshelf.css';
import jwtDecode from "jwt-decode";

import AuthContext from "../Context/UserContext"
import LoadBook from "./LoadBook";

function Bookshelves({ library_data, currentBookshelf, setCurrentBook }) {

    const [currentUser, setCurrentUser] = useContext(AuthContext);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setCurrentUser({ user: jwtDecode(token) });
        };
    }, [setCurrentUser]);

    const shouldDisplay = (bookshelf, key) => {
        if (bookshelf.parentBookshelfId === currentBookshelf) {
            return (
                <li key={key} id="bookshelves" className="collection-item avatar valign-wrapper">
                    <i id="icon" className="material-icons circle orange lighten-2">folder</i>
                    <p className="library">{bookshelf.name}</p>
                    <Link id="lib-button" className="btn orange lighten-2" to={`/library/${bookshelf.bookshelfId}`}>Open</Link>
                </li>
            )
        }
    }

    const loadBooks = (bookshelf, key) => {
        if (bookshelf.bookshelfId === currentBookshelf) {
            if(bookshelf?.books < 0){
                
            }
            else {
                return bookshelf.books.map((book) => <li key={book.isbn}><LoadBook isbn={book.isbn} setCurrentBook={setCurrentBook} /></li>)
            }
        }
    }


    return (
        <>
            <ul className="collection">
                {library_data.bookshelves.map((bookshelf, i) =>
                    shouldDisplay(bookshelf, i)
                )}

                {library_data.bookshelves.map((bookshelf, i) =>
                    loadBooks(bookshelf, i)
                )}
            </ul>
        </>
    )
}

export default Bookshelves;