import React from "react";
import icon from "../img/icon.png";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <header>
            <div>
                <Link to="/">
                    <img className="logo" src={icon} alt="logo" />
                </Link>
            </div>
        </header>
    );
};
export default Header;
