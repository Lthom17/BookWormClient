import { useState } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

function AddBookshelf({ library, reloadLibrary }) {

    const [parent, setParent] = useState("")

    const [name, setName] = useState("");

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBookshelf = {
            "bookshelfName": `${name}`,
            "type": "member",
            "libraryId": `${library.libraryId}`,
            "parentId": `${parent}`
        }

        //console.log(newBookshelf);

        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(newBookshelf)
        }

        fetch("http://localhost:8080/api/library/bookshelf", init)
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
                    M.toast({html: 'Bookshelf Created', classes: 'rounded'});
                    reloadLibrary(true);
                } else {
                    console.log(data)
                }
            })


    }

    const findParentId = (bookshelfName) => {
        if (bookshelfName == "Your Library") {
            console.log("here")
            setParent("")
        }
        else {
            library?.bookshelves?.map((bookshelf => {
                if (bookshelf.name == bookshelfName) {
                    setParent(bookshelf.bookshelfId)
                }
            }))
        }
    }

    const updateParent = (e) => {
        findParentId(e.target.value);
        console.log(e.target.value)
    }

    const updateName = (e) => {
        setName(e.target.value);
    }

    return (
        <div id="AddBookshelf" className="modal">
            <div className="modal-content">
                <h4>Add Bookshelf</h4>
                <form id="addBookshelf" onSubmit={handleSubmit}>

                    <div className="input-field">
                        <input id="name" type="text" onChange={e => updateName(e)} />
                        <label htmlFor="name">Bookshelf Name</label>
                    </div>

                    <div className="input-field">
                        <select id="parent" onChange={e => updateParent(e)}>
                            {library?.bookshelves && (

                                library.bookshelves.map((bookshelves, i) => {
                                    return <option key={i} value={bookshelves.bookshelvesId}>{bookshelves.name}</option>
                                })

                            )}
                            <option value={"Your Library"}>Your Library</option>
                        </select>
                        <label htmlFor="parent">Location</label>

                    </div>

                </form>
            </div>
            <div className="modal-footer">
                <button type="submit" form="addBookshelf" className="modal-action modal-close waves-effect waves-green btn-flat">Submit</button>
                {/* <a href="#!" className="modal-close waves-effect waves-green btn-flat">Select</a> */}
                <a className="modal-close waves-effect waves-green btn-flat">Cancel</a>
            </div>
        </div>
    )
}

export default AddBookshelf