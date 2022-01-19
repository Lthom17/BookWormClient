import { useEffect, useState } from "react/cjs/react.development";
import { useHistory } from "react-router-dom";

function DeleteBook({Library, currentBookshelf, isbn, reloadLibrary}) {

    const [currentBookshelfName, setCurrentBookshelfName] = useState("")

    const history = useHistory();

    const findCurrentBookshelfName = () => {
        Library?.bookshelves?.map((bookshelf => {
            if(bookshelf.bookshelfId == currentBookshelf){
                setCurrentBookshelfName(bookshelf.name)
            } 
        }))
    }

    const handleClick = () => {

        const toDelete = {
            "isbn": `${isbn}`,
            "bookshelfId": `${currentBookshelf}`
        }

        console.log(`starting delete of ${isbn}`)
        const init = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(toDelete)
        }

        fetch("http://localhost:8080/api/library/book", init)
            .then(responce => {
                if(responce.status === 204){
                    return null
                } 
                else if(responce.status === 404){
                    console.log("404 not found")
                    return responce.json();
                }
            })
            .then(data => {
                if(!data) {
                    reloadLibrary(true);
                } else {
                    console.log("error in deleting book")
                }
            })
        
        
    }


    useEffect(() => {
        findCurrentBookshelfName()
    }, [Library, currentBookshelf])

    return (
        <div id="DeleteBook" className="modal">
            <div className="modal-content">
                <h4>Delete Book</h4>
                <div className="row"></div>
                <p >Are you sure you want to delete the book: </p>
                <p className="delete-confirm">{currentBookshelfName}</p>
            </div>
            <div className="modal-footer">
                <button onClick={handleClick} className="modal-action modal-close waves-effect waves-green btn-flat">Confirm</button>
                <a className="modal-close waves-effect waves-green btn-flat">Cancel</a>
            </div>
        </div>
    )
}
export default DeleteBook;