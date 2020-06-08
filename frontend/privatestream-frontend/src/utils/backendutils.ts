import axios from "axios";

const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? ""
    : "https://2snjzifv6f.execute-api.eu-central-1.amazonaws.com/prod";
export const getHealth = async () => {
  return await axios.get(BACKEND_URL + "/health");
};
