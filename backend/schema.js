const graphql = require("graphql");
const axiosConfig = require("./axiosConfig");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
} = graphql;

const UserType = new GraphQLObjectType({
    name: "User", //Just indicator that its an objector else code it wont recognize the object

    //need to be wrapped in ()=>(); becuase javascript would execute this block after everything in the file has loaded
    //this is because of how closures work.
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        company: { type: GraphQLString },
        age: { type: GraphQLInt },
        // company: {
        //     type: CompanyType,
        //     resolve(parentValue, args) {
        //         //parentValue is the result returned from the axios call
        //         //make sure to query this property eg; user(id:"23"){company{id}}
        //         console.log(parentValue);
        //         return axios
        //             .get(
        //                 `http://localhost:3000/companies/${parentValue.companyId}`
        //             )
        //             .then((response) => response.data);
        //     },
        // },
    }),
});

// const users = [{ id: "23", firstName: "Bill", age: 20 }];
//Able to get id for user or company
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return axiosConfig
                    .get("/users")
                    .then((response) => response.data);
            },
        },
        user: {
            type: UserType, //needed so you access user userType properties
            args: { id: { type: GraphQLID } },

            resolve(parentValue, args) {
                return axiosConfig
                    .get(`/users/${args.id}`)
                    .then((response) => response.data);
            },
        },
        // company: {
        //     type: CompanyType,
        //     args: { id: { type: GraphQLString } },
        //     resolve(parentValue, args) {
        //         // return users.find((user) => user.id === args.id);
        //         return axios
        //             .get(`http://localhost:3000/companies/${args.id}`)
        //             .then((response) => response.data);
        //     },
        // },
        //gefers companyId
    },
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) }, //cant be null
                lastName: { type: new GraphQLNonNull(GraphQLString) }, //cant be null
                company: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, { firstName, lastName, company }) {
                return axiosConfig
                    .post(`/users`, {
                        firstName,
                        lastName,
                        company,
                    })
                    .then((response) => response.data);
                //GraphQL creates an id of random string rather than a number
                //like Redux/REST
            },
        },
    },
});
module.exports = new GraphQLSchema({ query: RootQuery, mutation });
