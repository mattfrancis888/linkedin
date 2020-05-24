import React from "react";
import { Route, Router } from "react-router-dom";
import Header from "./Header";
import history from "../history";
function App() {
    return (
        <React.Fragment>
            <Router history={history}>
                <Header />
            </Router>
        </React.Fragment>
    );
}

export default App;
