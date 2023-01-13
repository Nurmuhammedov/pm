import React, {createContext} from "react";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import {Route, Routes} from "react-router-dom";


export const ctx = createContext(null);

const selectOptions = [
    {value: "/", label: "Testlar"},
    {value: "/all-tests", label: "Barcha testlar"},
    {value: "/top-rated-tests", label: "Saralangan testlar"},
    {value: "/english-tests", label: "Ingliz tili"},
    {value: "/problematic-issues", label: "Muammoli masalalar"},
    {value: "/critical-thinking", label: "Tanqidiy fikrlash"},
];
const dropdownOptions = [
    {value: "/", label: "Bizning kanallar"},
    {value: "/english-tests", label: "Ingliz tili testlari"},
    {value: "/main-channel", label: "Asosiy kanal"},
    {value: "/premium-tests-channel", label: "Pullik testlar kanali"},
];

function App() {
    return (
        <ctx.Provider value={null}>
            <main>
                <Routes>
                    <Route path="*" element={<Home dropdownOptions={dropdownOptions} selectOptions={selectOptions}/>} />
                </Routes>
            </main>
            <Footer/>
        </ctx.Provider>
    );
}

export default App;
