import React from "react";
import "./AdminLayout.css";
import { Navbar } from "../../components/index";
import { Outlet, Navigate } from "react-router-dom";
const AdminLayout = () => {
  return (
    <div>
      <Navbar
        role="Admin Space "
        pic="https://www.shutterstock.com/image-vector/user-icon-vector-260nw-393536320.jpg"
        itemOne="Dashboard"
        itemTwo="List of Users  "
        pathOne="/admin/Dashboard"
        pathTwo="/admin/List"
      />

      <Outlet />
      {/* <Navigate replace to="/admin/dashboard" /> */}
    </div>
  );
};

export default AdminLayout;

/* <Routes>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => <route.component {...props} />}
                />
              )
            );
          })}
        </Routes> */

/* <Dashboard>
        <h1>Admin Dashboard</h1>
        <Box />
      </Dashboard> */

/* <Footer /> */
