import React from "react";
import faker from "faker";
// import gql from "graphql-tag";
// import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { useHistory } from "react-router";
import getUsersQuery from "../queries/getUsers";

//gql query will appear in props; much like redux reducers!
const Home = (props) => {
    const history = useHistory();
    // const { loading, error, data } = useQuery(PROFILE_INFO);
    const renderProfiles = () => {
        //render porfile after props.data.loading === false

        return props.data.users.map((user) => {
            return (
                <div className="userCard" key={user.id}>
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
        if (props.data.loading) {
            return <div>Loading...</div>;
        } else {
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
        }
    };

    return <React.Fragment>{renderContent()}</React.Fragment>;
};

//query is automatically called if it's passed here; result will be in props.data
export default graphql(getUsersQuery)(Home);
