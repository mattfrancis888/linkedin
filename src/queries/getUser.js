import { gql } from "apollo-boost";
export default gql`
    query UserQuery($id: ID!) {
        user(id: $id) {
            id
            firstName
            lastName
            company
        }
    }
`;
