import React from "react";
import { Route, Redirect } from "react-router-dom";
// HOC особый компонент!
// Спросить Лизу почему при перезагрузке этой страницы всё летит к чёрту

const ProtectedRoute = ({ loggedIn, toRedirect, ...props }) => {

  React.useEffect(() => {
    if (!loggedIn){
      toRedirect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loggedIn 
  ? <Route {...props} /> 
  : <Redirect to="./" />;
};

export default ProtectedRoute;
