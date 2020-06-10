import React from "react";
import faker from "faker";
// import gql from "graphql-tag";
// import { useQuery } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";
import { graphql } from "react-apollo";
import { useHistory } from "react-router";
import getUsersQuery from "../queries/getUsers";
import Loading from "./Loading";

//gql query will appear in props; much like redux reducers!
const Home = () => {
    const history = useHistory();
    const { loading, error, data } = useQuery(getUsersQuery);
    if (error)
        return (
            <h1 className="queryErrorMessage">{`Error: ${error.message}`}</h1>
        );
    if (loading) {
        return (
            <div className="loadingCenter">
                <Loading />
            </div>
        );
    }

    const renderProfiles = () => {
        //render porfile after props.data.loading === false

        return data.users.map((user) => {
            return (
                <div
                    onClick={() => history.push(`/user/${user.id}`)}
                    className="userCard"
                    key={user.id}
                >
                    <img
                        className="userImg"
                        src={faker.image.avatar()}
                        alt="user pic"
                    ></img>
                    <h1 className="userName">
                        {`${user.firstName} ${user.lastName}`}
                    </h1>
                    <h2 className="userCompany">
                        {`Working at: ${user.company}`}
                    </h2>
                </div>
            );
        });
    };
    const renderContent = () => {
        return (
            <div className="contentContainer">
                <div className="homeTitleAndButtonWrap">
                    <h1 className="checkOutProfileTitle">
                        Check out these profiles:
                    </h1>
                    <button
                        className="createProfileButton"
                        onClick={() => history.push("/join")}
                    >
                        <h1>Create Your Profile</h1>
                    </button>
                </div>
                <div className="userContainer">{renderProfiles()}</div>
            </div>
        );
    };

    return <React.Fragment>{renderContent()}</React.Fragment>;
};

export default Home;
