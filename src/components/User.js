import React from "react";
import { Link } from "react-router-dom";
import userProfileBackground from "../img/userprofile-bg.svg";
const User = () => {
    return (
        <div className="userProfileContainer">
            <div className="userProfileCard">
                <div
                    className="userProfileBackground"
                    style={{
                        backgroundImage: `url(${userProfileBackground})`,
                        backgroundSize: "cover",
                    }}
                ></div>
                <div className="userProfilePicContainer"></div>
                <div className="userProfileInfoWrap">
                    <h1 className="userProfileName">First Name + last name</h1>
                    <h2 className="userProfileCompany">Company</h2>
                </div>
            </div>
        </div>
    );
};
export default User;
