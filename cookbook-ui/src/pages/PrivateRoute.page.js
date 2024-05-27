import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import Loading from "../Components/Loading/Loading";

const PrivateRoute = () => {
  // Fetching the user and loading state from the user context.
  const { user, loading } = useContext(UserContext);
  const location = useLocation();
  const redirectLoginUrl = `/login?redirectTo=${encodeURI(location.pathname)}`;

  if (loading) {
    return <Loading/> ; 
  }

  // If the user is not logged in we are redirecting them
  // to the login page. Otherwise we are letting them to
  // continue to the page as per the URL using <Outlet />.
  return !user ? <Navigate to={redirectLoginUrl} /> : <Outlet />;
};

export default PrivateRoute;
