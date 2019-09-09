import React from "react"
import DataProvider from "./data/DataProvider";
import HomePage from "./ui/HomePage";
import './styles/index.scss';


// FUNCTION = STATELESS
// CALL = STATE FULL
// USE CLASS FOR CONTENT

function App() {
    return (
        <DataProvider>
            <HomePage/>
        </DataProvider>
    );
}

export default App;
