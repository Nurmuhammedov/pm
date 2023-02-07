import axios from "axios";

const instance = axios.create({
    baseURL: "https://pmtests.uz/",
    withCredentials: true
});

instance.interceptors.request.use(config => {
    if (localStorage.getItem("accessToken")) {
        config.headers["Authorization"] = "Bearer " + localStorage.getItem("accessToken");
    }
    return config;
});
export default instance;