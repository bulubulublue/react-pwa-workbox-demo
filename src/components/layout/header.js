import React from "react";
import NetflixLogo from '../icons/NetflixLogo'
import {Link} from '@reach/router'
import Nav from './nav'

const Header = () => {
    return (
        <header className="header">
            <div id="logo" className="logo">
                <Link to="/">
                    <NetflixLogo/>
                </Link>
            </div>
            <Nav/>
        </header>
    )
}

export default Header