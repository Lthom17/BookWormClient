import { useEffect, useState, useContext, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";
import './Styles/Library.css';
import jwtDecode from "jwt-decode";
import M from 'materialize-css'

import AuthContext from "../Context/UserContext"
import { useHistory } from "react-router-dom";
import AddBookshelf from "./AddBookshelf";
import DeleteBookshelf from "./DeleteBookshelf";
import DeleteBook from "./DeleteBook";

function Library() {

    const { current_bookshelf } = useParams()

    const [selectedBook, setSelectedBook] = useState("")

    const [library, setLibrary] = useState([])

    const [reload, triggerReload] = useState(false)

    const [currentUser, setCurrentUser] = useContext(AuthContext);

    const history = useHistory();

    const fetchLibrary = useCallback(async () => {
        try {
            const token = await localStorage.getItem("token");
            if (token) {
                await setCurrentUser({ user: jwtDecode(token) })
            }

            await fetch(`http://localhost:8080/api/member/${currentUser?.user.sub}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
                .then(response => response.json())
                .then(data => setLibrary(data.library))
        } catch (err) {
           console.log(err)
        }
    }, [currentUser?.user.sub, setCurrentUser])

    useEffect(() => {
        M.AutoInit();
    }, [M.AutoInit()])

    useEffect(() => {

        fetchLibrary();
        
        triggerReload(false);
    }, [fetchLibrary, reload])

    return (
        <>
            <div>
                <div className="page-label container">
                    <h2 className="center-align">Your Library</h2>
                </div>

                <ul className="collection">
                    <div className="row center-align">
                        {current_bookshelf ? (
                            <>
                                <button id="lib-button" className="btn col s3" onClick={history.goBack}>Go Back</button>
                                <div className="col s1"></div>
                                <a id="lib-button" className="btn modal-trigger orange lighten-2 col s4" href="#AddBookshelf">Add bookshelf</a>
                                <div className="col s1"></div>
                                <a id="lib-button" className="btn modal-trigger red lighten-2 col s3" href="#DeleteBookshelf">Delete bookshelf</a>
                            </>
                        ) : (
                            <a id="lib-button" className="btn modal-trigger orange lighten-2" href="#AddBookshelf">Add bookshelf</a>
                        )}
                    </div>
                    {library?.bookshelves ? (
                        <>
                            {current_bookshelf ? (
                                <Bookshelf library_data={library} currentBookshelf={current_bookshelf} setCurrentBook={setSelectedBook}/>
                            ) : (
                                <Bookshelf library_data={library} currentBookshelf={null} setCurrentBook={setSelectedBook}/>
                            )}
                        </>
                    ) : (
                        <>
                            <div id="bookshelves" className="center-align">
                                <p className="no-book">No bookshelves found, create a bookshelf to start collecting and organizing your books!</p>
                            </div>
                        </>
                    )}

                    
                </ul>
            </div>

            <AddBookshelf library={library} reloadLibrary={triggerReload}/>

            <DeleteBookshelf Library={library} currentBookshelf={current_bookshelf} reloadLibrary={triggerReload}/>

            <DeleteBook Library={library} currentBookshelf={current_bookshelf} isbn={selectedBook} reloadLibrary={triggerReload}/>
        </>
    )
}

export default Library;