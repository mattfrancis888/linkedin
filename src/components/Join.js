import React, { useEffect, useState } from "react";
import register from "../img/register-pic.svg";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { useHistory } from "react-router";
import getUsersQuery from "../queries/getUsers";
const CreateProfile = (props) => {
    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        //If we have fetched data at the home page, unlike redux/REST when we go back to history.push("/") after the mutaitonn
        //GraphQL does not automatically re-fetch the list of data agian

        //For example, if you went to the home page and then go to the join page
        //Then click the join button (which will return you to the home page)
        //graphql will not re-fetch the queries at the home page again, so you see
        //no new data updated
        await props.mutate({
            variables: {
                firstName: "Obiwan",
                lastName: "Kenobi",
                company: "Google",
            },
            refetchQueries: [{ query: getUsersQuery }],
            //Note: if we needed to add variables tot he refetchQueries, we can do:
            //refetchQueries: [{ query: getUsersQuery, variables }],

            //To solve the problem above
            //refetchQueries will call the query after mutate is executed
            // it will tell the other components, like Home (who uses the same query)
            //that they do not need to execute the query again
            //because it is already executed here
        });
        //history.push("/");
        console.log(firstName);
    };

    return (
        <React.Fragment>
            <div className="joinContainer">
                <form className="joinForm">
                    <label htmlFor="firstNameInput">First Name</label>
                    <input
                        type="text"
                        className="firstNameInput"
                        name="firstNameInput"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label htmlFor="lastNameInput">Last Name</label>
                    <input
                        type="text"
                        className="lastNameInput"
                        name="lastNameInput"
                        // onChange={(e) => setLastName(e.target.value)}
                    />
                    <label htmlFor="companyNameInput">Company Name</label>
                    <input
                        type="text"
                        className="companyNameInput"
                        name="companyNameInput"
                    />
                    <button className="joinButton" onClick={handleSubmit}>
                        Join
                    </button>
                </form>

                {<img className="joinImg" src={register} alt="register" />}
            </div>
        </React.Fragment>
    );
};

//mutation does not need outside curly braces; will cause syntax error
const mutation = gql`
    mutation AddUser(
        $firstName: String!
        $lastName: String!
        $company: String!
    ) {
        addUser(firstName: $firstName, lastName: $lastName, company: $company) {
            id
        }
    }
`;

//query is automatically called if it's passed here; result will be in props.data
export default graphql(mutation)(CreateProfile);
