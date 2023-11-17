import axios from "axios";

export const initialProfile = async () => {
  try {
    const user = await axios.get("/api/auth/session");
    console.log({ user });
  } catch (error) {
    console.log(error);
  }
};
