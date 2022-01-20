import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import M from "materialize-css";

function AddBook({ library, selectedBook }) {

  const [parent, setParent] = useState();

  const history = useHistory();



  const handleClick = () => {

    if(parent === undefined){
      M.toast({html: 'You must select a bookshelf', classes: 'rounded'});
      return
    }

    const bookToAdd = {
      "isbn": `${selectedBook.isbn}`,
      "author": `${selectedBook.author}`,
      "title": `${selectedBook.title}`,
      "bookshelfId": `${parent}`
    }
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(bookToAdd)
    }

    fetch("http://localhost:8080/api/library/book", init)
      .then(responce => {
        if (responce.status === 201) {
          return null
        }
        else if (responce.status === 404) {
          console.log("404 not found")
          return responce.json();
        }
      })
      .then(data => {
        if (!data) {
          M.toast({html: 'Book Added', classes: 'rounded'});
          //history.push("/library")
        } else {
          console.log(data)
        }
      })


  }

  const findSelectedId = (bookshelfName) => {
    library?.bookshelves?.map((bookshelf => {
      if (bookshelf.name == bookshelfName) {
        setParent(bookshelf.bookshelfId)
      }
    }))
  }

  const updateParent = (e) => {
    findSelectedId(e.target.value);
  }

  return (

    <div id="AddToPersonal" className="modal">
      <div className="modal-content">
        <h4>Select bookshelves</h4>

        <div className="input-field modal-spacing">
          <select onChange={e => updateParent(e)} defaultValue={"1"}>
          <option value="1" disabled>Choose a bookshelf</option>
            {library?.bookshelves && (

              library.bookshelves.map((bookshelves, i) => {
                return <option key={i} value={bookshelves.bookshelvesId}>{bookshelves.name}</option>
              })

            )}
          </select>
        </div>

      </div>
      <div className="modal-footer">
        <button onClick={handleClick} className="modal-action modal-close waves-effect waves-green btn-flat">Add Book</button>
        <a className="modal-close waves-effect waves-green btn-flat">Cancel</a>
      </div>
    </div>

  )
}

export default AddBook;