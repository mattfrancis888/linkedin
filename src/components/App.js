import React from "react";
import { Route, Router } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import history from "../history";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//Apollo-client gets the data from the server and stores it locally
//react-apollo is what glues react and apollo together
const client = new ApolloClient({});
//empty param assumes the graphql server is on /grapql route

function App() {
    return (
        <ApolloProvider client={client}>
            <React.Fragment>
                <Router history={history}>
                    <Header />
                    <Route path="/" exact component={Home} />
                </Router>
            </React.Fragment>
        </ApolloProvider>
    );
}

export default App;
