import axios from "axios";

const instance = axios.create({
    baseURL: "http://192.168.5.13:8000/",
    withCredentials: true
});

instance.interceptors.request.use(config => {
    if (localStorage.getItem("access_token")) {
        config.headers["Authorization"] = "Bearer " + localStorage.getItem("access_token");
    }
    return config;
});
export default instance;