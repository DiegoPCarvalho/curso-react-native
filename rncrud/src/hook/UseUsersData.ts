import { useContext } from "react";
import UsersContext from "../context/UsersContext";

const useUserData = () => useContext(UsersContext);

export default useUserData;