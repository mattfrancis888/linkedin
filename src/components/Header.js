import React from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <header>
            <div>
                <Link to="/">
                    <img className="logo" src={logo} alt="logo" />
                </Link>
            </div>
        </header>
    );
};
export default Header;
