import {Link} from "react-router-dom"

import "./Navbar.css"

function Navbar() {
    return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                {/* <a className="navbar-brand" href="#">Navbar</a> */}
                <Link className="navbar-brand" href="#" to={"/about"}>About</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                        <Link className="nav-link active" aria-current="page" href="#" to={"/home"}>Home</Link>
                        <Link className="nav-link" href="#" to={"/social"} >Social</Link>
                        
                        {/* <a className="nav-link" href="#">Pricing</a>
                        <a className="nav-link disabled" aria-disabled="true">Disabled</a> */}
                    </div>
                </div>
            </div>
        </nav>
        {/* <nav >
            <Link to={"/about"}>About</Link>
        </nav> */}
    </>
    )
}

export default Navbar