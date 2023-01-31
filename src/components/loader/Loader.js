import BeatLoader from "react-spinners/ClipLoader";

function Loader() {
    const loaderStyle = {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };
    return (
        <div style={loaderStyle}>
            <BeatLoader loading={true} size={80} cssOverride={{borderWidth: ".3rem"}} color="#0139FF"/>
        </div>
    );
}

export default Loader;
