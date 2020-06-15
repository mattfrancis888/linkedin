const axios = require("axios");
const axiosConfig = axios.create({
    // .. where we make our configurations
    baseURL: "https://linkedin-backend.now.sh/",
});
module.exports = axiosConfig;
