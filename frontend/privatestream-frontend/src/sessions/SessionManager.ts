import { SessionManagerInterface } from "./typings/SessionManagerInterface";
import { LoginCredentials } from "../../../../backend/privatestream-backend/typings/LoginCredentials";
import axios from "axios";

const BASE_URL = "http://localhost:4000"; // TODO put in config.js and change after backend deployment

const signup = async (credentials: LoginCredentials) => {
  const token = await axios.post(BASE_URL + "/signup", credentials);
  return token.data;
};
const login = async (credentials: LoginCredentials) => {
  const token = await axios.post(BASE_URL + "/signup", credentials);
  return token.data;
};
//logout = () => {};

export { signup, login };
