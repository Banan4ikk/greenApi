import axios from "axios";

const foreignApiClient = axios.create({
  baseURL: "https://12ac8b8069e9a082.mokky.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

export default foreignApiClient;
