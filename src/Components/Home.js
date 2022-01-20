import './Styles/Home.css'
import logo from '../Resource/bookworm_logo.png'

function Home() {
    return (
        <>
            <div className='container'>


                <div className="content">
                    <h1 className="center-align">Welcome to Bookworms</h1>

                    <div className='logo center-align'>
                        <img src={logo} className='logo-img'></img>
                    </div>

                    <p className="center-align">
                        The site where you can create your own
                        personal Library, categorizing your books how you like!
                    </p>

                    <p className="center-align">
                        Create or join Groups with similar interests to create a group Library
                        allowing you to share your favorite books with anyone.
                    </p>

                </div>



            </div>
        </>
    )
}

export default Home