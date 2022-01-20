import { useEffect, useState, useRef, useCallback, useContext } from "react";
import { useParams } from "react-router-dom"
import useFetch from "../Hooks/useFetch";
import AddBook from "./AddBook";
import Book from "./Book"

import jwtDecode from "jwt-decode";

import AuthContext from "../Context/UserContext"

import './Styles/Search.css'

function Search() {
    const { search_query } = useParams();

    const [page, setPage] = useState(0);

    const [library, setLibrary] = useState([]);

    const [selectedBook, setSelectedBook] = useState("")

    const [currentUser, setCurrentUser] = useContext(AuthContext);

    const { loading, error, results } = useFetch(search_query, page);



    const loader = useRef(null);


    const validBook = (book, i) => {
        if (book?.isbn) {
            return <Book book_data={book} key={i} setCurrentBook={setSelectedBook} />;
        }
    }

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    }, []);

    // const fetchLibrary = async () => {
    //     const token = await localStorage.getItem("token");
    //     if (token) {
    //         await setCurrentUser({ user: jwtDecode(token) })
    //     }

    //     await fetch(`http://localhost:8080/api/member/${currentUser?.user.sub}`)
    //         .then(response => response.json())
    //         .then(data => setLibrary(data.library))
    // }

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
        fetchLibrary()

    }, [fetchLibrary])

    useEffect(() => {

        const option = {
            root: this,
            rootMargin: "20px",
            threshold: 0.5
        };
        const observer = new IntersectionObserver(handleObserver, option);
        observer.observe(loader.current);
    }, [handleObserver]);

    return (
        <>
            <div className="page-label container">
                <h2 className="center-align">Search Results</h2>
            </div>
            {results && (
                <>
                    {results.map((book, i) => validBook(book, i))}
                </>
            )}
            {loading && (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            )}
            <div ref={loader} />

            <AddBook library={library} selectedBook={selectedBook} />
        </>
    )
}

export default Search