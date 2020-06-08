import React from "react";
import { useQuery } from "@apollo/react-hooks";
import userProfileBackground from "../img/userprofile-bg.svg";
import getUserQuery from "../queries/getUser";
import faker from "faker";
const User = (props) => {
    const { loading, error, data } = useQuery(getUserQuery, {
        variables: { id: props.match.params.id },
    });
    if (error) return `Error! ${error.message}`;
    if (loading) return "Loading...";

    return (
        <div className="userProfileContainer">
            <div className="userProfileCard">
                <div
                    className="userProfileBackground"
                    style={{
                        backgroundImage: `url(${userProfileBackground})`,
                        backgroundSize: "cover",
                    }}
                    //Used style because this svg maintans raito and can't be manipulated with
                    //certain width/height property
                ></div>

                <img
                    className="userProfilePic"
                    src={faker.image.avatar()}
                    alt="user pic"
                ></img>

                <div className="userProfileInfoWrap">
                    <h1 className="userProfileName">
                        {`${data.user.firstName} ${data.user.lastName}`}
                    </h1>
                    <h2 className="userProfileCompany">{`Working at: ${data.user.company}`}</h2>
                </div>
            </div>
        </div>
    );
};
//props first go to graphql helper then the props is passed along to the user
export default User;
//the result of the getUserQuery would now appear in User's props
