import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isAdmin } from "../utils/isAdmin";
const AdminProtected = ({ children }) => {
   
    const navigate = useNavigate()
    console.log(JSON.parse(localStorage.getItem('isAdmin')))
  if (JSON.parse(localStorage.getItem('isAdmin'))===false||JSON.parse(localStorage.getItem('isAdmin'))==null) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};
export default AdminProtected;