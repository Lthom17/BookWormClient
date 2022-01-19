import { useEffect } from "react"
import './Styles/Book.css';
import M from 'materialize-css'

function Book({ book_data, setCurrentBook }) {

  useEffect(() => {
    M.AutoInit();
  },[])

  const handleClick = () => {
    setCurrentBook(
      {
        'isbn' : book_data.isbn[0],
        'title' : book_data.title,
        'author' : book_data.author_name[0]
      }
    )
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
                <i className="material-icons icon-size white-text">import_contacts</i>
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

                    {book_data?.subject && (
                      <div className="row">
                        <p className="col s3 data-label">Subject:</p>
                        <p className="col s9">{book_data.subject[0]}</p>
                      </div>
                    )}

                  </>
                )}
              </div>

              {/*Contains buttons to trigger modal popup*/}
              {/*Modal componet in AddBook.js with is part of Search.js*/}

              <div className="card-action">
                <div id="actions" className="row">
                  <a id="button" className="btn-flat modal-trigger right" onClick={handleClick} href="#AddToPersonal">Add to Personal Library</a>
                  {/* <a id="button" className="btn-flat modal-trigger" href="#AddToGroup2">Add to Group Library</a> */}
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    )
  }
}

//{book_data?.description && (<p>Description {book_data.description}</p>)}

export default Book