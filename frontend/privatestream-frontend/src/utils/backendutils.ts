import axios from "axios";

export const getHealth = async () => {
  return await axios.get("/health");
};
