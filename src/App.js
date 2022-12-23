import React, {createContext} from "react";
import Header from "./components/header/Header";

export const ctx = createContext(null)

function App() {
    return (
        <ctx.Provider value={null}>
            <Header coloredLogo={true}/>
        </ctx.Provider>
    );
}

export default App;
