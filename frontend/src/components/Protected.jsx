import { Navigate, useNavigate } from "react-router-dom";
const Protected = ({ children }) => {
    const navigate = useNavigate()
  if (!localStorage.getItem('token')) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};
export default Protected;