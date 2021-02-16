import React from "react";
import { Route, useLocation, Redirect } from "react-router-dom";
// HOC особый компонент!

const ProtectedRoute = ({ isLoading, loggedIn, handleOpenLogin, ...props }) => {
  
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (!loggedIn && pathname === "/saved-news") {
      handleOpenLogin()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading || loggedIn
  ? <Route {...props} /> 
  : <Redirect to="/" />;
};

export default ProtectedRoute;
