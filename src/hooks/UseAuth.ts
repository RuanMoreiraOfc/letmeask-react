import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

export default useAuth;

function useAuth() {
    return useContext( AuthContext );
}