import { gql } from "apollo-boost";
export default gql`
    {
        users {
            id
            firstName
            lastName
            company
        }
    }
`;
