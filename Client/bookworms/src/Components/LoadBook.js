import { useEffect } from "react"
import './Styles/Book.css';
import { useState } from "react/cjs/react.development";
import M from "materialize-css";

function LoadBook({ isbn, setCurrentBook }) {

    const [book_data, setBook_Data] = useState({});


    useEffect(() => {
        M.AutoInit()
    }, [])

    // title, author, date, isbn, subject
    useEffect(() => {
        fetch(`https://openlibrary.org/search.json?isbn=${isbn}`)
            .then(response => response.json())
            .then(data => setBook_Data(data.docs[0]))
    }, [isbn])

    const handleClick = () => {
        setCurrentBook(isbn)
    }

    if (book_data) {
        return (
            <>
                <div className="col s12 m7">
                    <h5 className="header z-depth-2">{book_data.title}</h5>
                    <div className="card horizontal">
                        <div className="card-image valign-wrapper">
                            {book_data.cover_i ? (
                                <img className="image" src={`https://covers.openlibrary.org/b/id/${book_data.cover_i}-M.jpg`} />
                            ) : (
                                <i className="material-icons icon-size white-text">book</i>
                            )}
                        </div>
                        <div className="card-stacked">

                            <div id="library" className="card-content">
                                {book_data && (
                                    <>
                                        {book_data?.author_name && (
                                            <div className="row">
                                                <p className="col s3 data-label">Author:</p>
                                                <p className="col s9">{book_data.author_name.toString()}</p>
                                            </div>
                                        )}

                                        {book_data?.publish_date && (
                                            <div className="row">
                                                <p className="col s3 data-label">Date Published:</p>
                                                <p className="col s9">{book_data.publish_date[0]}</p>
                                            </div>
                                        )}

                                        {book_data?.isbn && (
                                            <div className="row">
                                                <p className="col s3 data-label">ISBN:</p>
                                                <p className="col s9">{book_data.isbn[0]}</p>
                                            </div>
                                        )}

                                    </>
                                )}
                            </div>

                            <div className="card-action right-align">
                                <a id="button" className="btn-flat modal-trigger" onClick={handleClick} href="#DeleteBook">Remove Book</a>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default LoadBook