import axios from "axios";

const instance = axios.create({
    baseURL: "http://85.193.84.30/",
    withCredentials: true
});

instance.interceptors.request.use(config => {
    if (localStorage.getItem("accessToken")) {
        config.headers["Authorization"] = "Bearer " + localStorage.getItem("accessToken");
    }
    return config;
});
export default instance;