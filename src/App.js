import React, {createContext} from "react";
import Header from "./components/header/Header";

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
            <div style={{
                height: "100vh",
                // background: "linear-gradient(117.04deg, #0139FF 32.51%, #AD00FF 81.63%)",
                background: "silver",
            }}>
                <Header
                    dropdownOptions={dropdownOptions}
                    selectOptions={selectOptions}
                    coloredLogo={true}
                />
            </div>
        </ctx.Provider>
    );
}

export default App;
