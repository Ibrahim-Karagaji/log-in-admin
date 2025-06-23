import { useRef, useState, useEffect, useContext } from "react";
import Loading from "./Loading";
import { useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../statesManagement/UserContextState";
import getAllUserService from "../services/getAlluserService";

export default function ProtectRoute({ children }) {
  if (!window.localStorage.getItem("token")) {
    return <Navigate to="/sign-in" />;
  }
  const dialogRef = useRef(null);
  const users = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dialogRef.current.showModal();
    const checkToken = async () => {
      const result = await getAllUserService();
      if (result.error) {
        navigate("/sign-in");
        return;
      }

      if (result.ok) {
        dialogRef.current.close();
        users.setUsers(result.users);
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  return isLoading ? <Loading dialogRef={dialogRef} /> : children;
}
