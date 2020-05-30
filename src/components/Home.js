import React from "react";
import faker from "faker";

const Home = () => {
    return (
        <div className="homeContainer">
            <h1 className="checkOutProfileTitle">Check out these profiles:</h1>
            <div className="userContainer">
                <div className="userCard">
                    <img
                        className="userImg"
                        src={faker.image.avatar()}
                        alt="user pic"
                    ></img>
                    <h1 className="userName">
                        {faker.name.firstName() + " " + faker.name.lastName()}
                    </h1>
                    <h2 className="userCompany">
                        {"Working at: " + faker.company.companyName()}
                    </h2>
                </div>
                <div className="userCard">
                    <img src="" alt="user pic"></img>
                    <h1 className="userName">Name</h1>
                    <h2 className="userCompany">Company</h2>
                </div>
            </div>
        </div>
    );
};
export default Home;
