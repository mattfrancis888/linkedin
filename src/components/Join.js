import React, { useEffect, useState } from "react";
import registerPic from "../img/register-pic.svg";
import { gql } from "apollo-boost";
import { useHistory } from "react-router";
import getUsersQuery from "../queries/getUsers";
import { useMutation } from "@apollo/react-hooks";

const CreateProfile = () => {
    const history = useHistory();
    //Inputs
    const [values, setValues] = useState({});

    //Form validation errors
    const [errors, setErrors] = useState({});

    //Button functionality
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [addUser] = useMutation(mutation);

    const addUserToDatabase = async () => {
        //If we have fetched data at the home page, unlike redux/REST when we go back to history.push("/") after the mutaitonn
        //GraphQL does not automatically re-fetch the list of data agian

        //For example, if you went to the home page and then go to the join page
        //Then click the join button (which will return you to the home page)
        //graphql will not re-fetch the queries at the home page again, so you see
        //no new data updated

        try {
            await addUser({
                variables: {
                    firstName: values.firstNameInput,
                    lastName: values.lastNameInput,
                    company: values.companyNameInput,
                },
                //awaitRefetchQueries: true,
                //Usage of awaitRefetchQueries: Queries refetched as part of refetchQueries are handled asynchronously, and are not waited on before the mutation is completed (resolved). Setting this to true will make sure refetched queries are
                //completed before the mutation is considered done. false by default.”
                //This will prevent memory leaks when you go back to Home page
                //because the query in Home would not be called AGAIN after refetchQueries
                //But as of now, this is not working due to a bug in Apollo
                //https://github.com/apollographql/react-apollo/issues/2267

                refetchQueries: [{ query: getUsersQuery }],

                //Note: if we needed to add variables to the refetchQueries, we can do:
                //refetchQueries: [{ query: getUsersQuery, variables }],

                //To solve the problem above
                //refetchQueries will call the query after mutate is executed
                // it will tell the other components, like Home (who uses the same query)
                //that they do not need to execute the query again
                //because it is already executed here
                //But as of Apolo v2.5, you need awaitRefetchQueries:true for this to happen
            });
        } catch (e) {
            alert(e.message);
            return;
        }

        history.push("/");
    };
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            addUserToDatabase();
        }
        // console.log("New errors are found");
    }, [errors]);
    //If error object changes, that means there are new errors
    const validate = (values) => {
        let errors = {};
        if (!values.firstNameInput) {
            errors.firstNameInput = "First Name is required";
        }
        if (!values.lastNameInput) {
            errors.lastNameInput = "Last Name is required";
        }
        if (!values.companyNameInput) {
            errors.companyNameInput = "Company Name is required";
        }
        // console.log(errors);
        return errors;
    };

    const handleChange = (e) => {
        e.persist();
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
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
                        onChange={handleChange}
                    />
                    {errors.firstNameInput && (
                        <p className="errorText">{errors.firstNameInput}</p>
                    )}

                    <label htmlFor="lastNameInput">Last Name</label>
                    <input
                        type="text"
                        className="lastNameInput"
                        name="lastNameInput"
                        onChange={handleChange}
                    />
                    {errors.lastNameInput && (
                        <p className="errorText">{errors.lastNameInput}</p>
                    )}

                    <label htmlFor="companyNameInput">Company Name</label>
                    <input
                        type="text"
                        className="companyNameInput"
                        name="companyNameInput"
                        onChange={handleChange}
                    />
                    {errors.companyNameInput && (
                        <p className="errorText">{errors.companyNameInput}</p>
                    )}

                    <button className="joinButton" onClick={handleSubmit}>
                        Join
                    </button>
                </form>

                {<img className="joinImg" src={registerPic} alt="register" />}
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
export default CreateProfile;
