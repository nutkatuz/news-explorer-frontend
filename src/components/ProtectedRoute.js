import React from "react";
import { Route, Redirect } from "react-router-dom";
// HOC особый компонент!

const ProtectedRoute = ({ loggedIn, isRedirect, ...props }) => {

  React.useEffect(() => {
    if (!loggedIn){
      isRedirect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loggedIn 
  ? <Route {...props} /> 
  : <Redirect to="./" />;
};

export default ProtectedRoute;

// eslint-disable-next-line no-lone-blocks
{
  /* <Route path="/my-profile">
  {!loggedIn ? <Redirect to="/log-in" /> : <UserProfile />}
</Route>  */
}
