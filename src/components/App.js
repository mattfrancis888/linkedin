import React from "react";
import { Route, Router } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import history from "../history";
function App() {
    return (
        <React.Fragment>
            <Router history={history}>
                <Header />
                <Route path="/" exact component={Home} />
            </Router>
        </React.Fragment>
    );
}

export default App;
