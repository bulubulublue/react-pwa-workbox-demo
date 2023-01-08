import React from "react";
import NetflixLogo from '../icons/NetflixLogo'
import {Link} from '@reach/router'
import Nav from './nav'
import '../../images/netflix-logo.png'

const Header = () => {
    return (
        <header className="header">
            <div id="logo" className="logo">
                <Link to="/">
                    <NetflixLogo/>
                </Link>
            </div>
            <Nav/>
            <div className="user-profile" >
            <div className="user">
                <div className="image">
                    <img src="/images/netflix-logo.png" alt="netflix"/>
                </div>
                </div>
            </div>
        </header>
    )
}

export default Header