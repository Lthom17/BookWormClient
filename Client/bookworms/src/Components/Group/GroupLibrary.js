import { useState } from "react"
import Book from "../Book"

function GroupLibrary() {

    const [library, setLibrary] = useState([])

    const group = {
        group_id: '61526a9e-7328-11ec-90d6-0242ac120003',
        name: 'The Scotland Saints',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer.',
        owner: 'SallyJ23',
        library_id: '615269a4-7328-11ec-90d6-0242ac120003'
    }

    const testLibrary = {
        "bookshelves": [
            {
                "books": [],
                "name": "Dragon Protagonist",
                "parentBookshelfId": "615272a0-7328-11ec-90d6-0242ac120003",
                "bookshelfId": "9f71448c-7326-11ec-90d6-0242ac120003"
            },
            {
                "books": [],
                "name": "Outer Space Murder Mysteries",
                "parentBookshelfId": null,
                "bookshelfId": "9f71448c-7326-11ec-90d6-0242ac120003"
            },
            {
                "books": [],
                "name": "Fantasy Worlds with Dragons",
                "parentBookshelfId": null,
                "bookshelfId": "9f71448c-7326-11ec-90d6-0242ac120003"
            }
        ],
        "libraryId": "9f71448c-7326-11ec-90d6-0242ac120003"
    }
    

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

    return (
        <>
            <div className="page-label container">
                <h2 className="center-align">{group.name} Library</h2>
            </div>

            <ul className="collection">
                {testLibrary?.bookshelves && (
                    testLibrary.bookshelves.map((bookshelves, i) =>
                        <li key={i} id="bookshelves" className="collection-item avatar valign-wrapper">
                            <i className="material-icons circle">folder</i>
                            <p className="library">{bookshelves.name}</p>
                        </li>
                    )
                )}

                <li><Book book_data={whereTheWildThingsAre} type="library" /></li>

                <li><Book book_data={lordOfTheRings} type="library" /></li>

                <li><Book book_data={animalFarm} type="library" /></li>

            </ul>
        </>
    )
}

export default GroupLibrary;