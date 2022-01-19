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

    const whereTheWildThingsAre = {

        "title": "Where the Wild Things Are",
        "publish_date": [
            "1970"
        ],
        "isbn": [
            "8420465569",
        ],
        "author_name": [
            "Maurice Sendak",
            "Tom Hollander",
            "Richard La Fleur"
        ],
        "cover_i": 50842,
        "subject": [
            "Caldecott Medal",
            "Dreams",
            "Fantasy",
            "Fantasy fiction",
            "Fiction",
            "Imagination",
            "Juvenile fiction",
            "Miniature books",
            "Monsters",
            "Specimens",
            "Fantasty",
            "Monstruos",
            "Fantas\u00eda",
            "Spanish language materials",
            "Novela",
            "open_syllabus_project",
            "Kings and rulers",
            "Conduct of life",
            "Fairy tales",
            "Children",
            "Animals",
            "Temper tantrums",
            "Ficci\u00f3n juvenil",
            "Accelerated Reader 2.9.",
            "Caldecott Medal books",
            "Children's fiction",
            "Monsters, fiction",
            "Picture books",
            "Novela juvenil",
            "Action & Adventure",
            "Classics",
            "People & Places",
            "Hispanic & Latino",
            "Spanish language",
            "Reading materials",
            "French Juvenile fiction",
            "Juvenile fiction, French",
            "Children's stories",
            "German language materials",
            "collectionID:caldecott60",
            "Behavior",
            "Latin language materials",
            "Accessible book"
        ]
    }

    const lordOfTheRings = {
        "title": "The Lord of the Rings",
        "publish_date": [
            "May 19, 1981",
        ],
        "isbn": [
            "9788533619623",
        ],
        "cover_i": 9255566,
        "author_name": [
            "J.R.R. Tolkien"
        ],
        "subject": [
            "The Lord of the Rings",
            "Fiction",
            "Ficci\u00f3n",
            "English Fantasy fiction",
            "Ficci\u00f3n fant\u00e1stica inglesa",
            "Fantasy fiction",
            "Fiction in English",
            "Open Library Staff Picks",
            "Middle Earth (Imaginary place)",
            "Fiction, fantasy, epic",
            "Middle earth (imaginary place), fiction",
            "Baggins, frodo (fictitious character), fiction",
            "Gandalf (fictitious character), fiction",
            "British and irish fiction (fictional works by one author)",
            "English literature",
            "Frodo Baggins (Fictitious character)",
            "Baggins, bilbo (fictitious character), fiction",
            "Fiction, fantasy, general",
            "English language",
            "Accessible book",
            "Protected DAISY"
        ]
    }

    const animalFarm = {
        "title": "Animal Farm",
        "publish_date": [
            "1983",
        ],
        "isbn": [
            "8499890954",
        ],
        "cover_i": 11261770,
        "author_name": [
            "George Orwell"
        ],
        "subject": [
            "British and irish fiction (fictional works by one author)",
            "political satire",
            "classic",
            "animal drama",
            "Fiction, political",
            "English literature: literary criticism",
            "For National Curriculum Key Stage 4 & GCSE",
            "Fiction, satire",
            "English literature",
            "Comics & graphic novels, literary",
            "Comics & graphic novels, adaptations",
            "Fiction",
            "Literature",
            "Drama (dramatic works by one author)",
            "Animals, fiction",
            "Behavior, fiction",
            "Totalitarianism",
            "Domestic animals",
            "Large type books",
            "Zhong pian xiao shuo",
            "Lectures et morceaux choisis",
            "Fran\u00e7ais (langue)",
            "Roman",
            "English Political satire",
            "Animales dom\u00e9sticos",
            "Ficci\u00f3n",
            "Totalitarismo",
            "Translations into Chinese",
            "Animals in literature",
            "Children's fiction",
            "Animals",
            "Power (Social sciences)",
            "Fiction, science fiction, general",
            "Orwell, george, 1903-1950",
            "Accessible book"
        ]
    }

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