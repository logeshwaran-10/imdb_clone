//Dependancies
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";

const routeTypeComponentMap = {
  public: PublicRoute,
  private: PrivateRoute,
  protected: ProtectedRoute,
};

const AppRouter = ({ routes, loader, loggedIn }) => {
  if (loader) {
    return <div className="text-primary">Loading</div>;
  }

  return (
    <Suspense fallback={"Loading..."}>
      <Routes>
        {routes.map((route, index) => {
          const RouteComponent =
            routeTypeComponentMap[route?.type] || React.Fragment;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                route?.type ? (
                  <RouteComponent {...route} loggedIn={loggedIn}>
                    {route.component}
                  </RouteComponent>
                ) : (
                  <RouteComponent {...route}>{route.component}</RouteComponent>
                )
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
