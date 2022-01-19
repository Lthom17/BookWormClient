import { useEffect, useState } from "react/cjs/react.development";
import { useHistory } from "react-router-dom";

function DeleteBookshelf({Library, currentBookshelf, reloadLibrary}) {

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
        const init = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: `${currentBookshelf}`
        }

        fetch("http://localhost:8080/api/library/bookshelf", init)
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
                    history.push("/library")
                } else {
                    console.log("error in deleting bookshelf")
                }
            })
        
        
    }


    useEffect(() => {
        findCurrentBookshelfName()
    }, [Library, currentBookshelf])

    return (
        <div id="DeleteBookshelf" className="modal">
            <div className="modal-content">
                <h4>Delete Bookshelf</h4>
                <div className="row"></div>
                <p >Are you sure you want to delete the bookshelf: </p>
                <p className="delete-confirm">{currentBookshelfName}</p>
                <p >All contained bookshelves and books will be lost!</p>
            </div>
            <div className="modal-footer">
                <button onClick={handleClick} className="modal-action modal-close waves-effect waves-green btn-flat">Confirm</button>
                <a className="modal-close waves-effect waves-green btn-flat">Cancel</a>
            </div>
        </div>
    )
}
export default DeleteBookshelf;