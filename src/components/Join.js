import React from "react";
import register from "../img/register-pic.svg";
const CreateProfile = () => {
    return (
        <React.Fragment>
            <div className="joinContainer">
                <form className="joinForm">
                    <label htmlFor="firstNameInput">First Name</label>
                    <input
                        type="text"
                        className="firstNameInput"
                        name="firstNameInput"
                    />
                    <label htmlFor="lastNameInput">Last Name</label>
                    <input
                        type="text"
                        className="lastNameInput"
                        name="lastNameInput"
                    />
                    <label htmlFor="companyNameInput">Company Name</label>
                    <input
                        type="text"
                        className="companyNameInput"
                        name="companyNameInput"
                    />
                    <button className="joinButton">Join</button>
                </form>

                {<img className="joinImg" src={register} alt="register" />}
            </div>
        </React.Fragment>
    );
};

export default CreateProfile;
