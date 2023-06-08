import React from "react";
import { BoxCfd } from "../../components/index";
import TableShowing from "./TableShowing";
const Dashboardcfd = (props) => {
  // return <>{props.children}</>;
  return (
    <>
      <h1>CFD Dashboard</h1>

      <BoxCfd />
      <TableShowing />
    </>
  );
};

export default Dashboardcfd;
