import React from "react";
import "./viced";
import { Navbar } from "../../components/index";
import { Outlet } from "react-router-dom";

const ViceD = () => {
  return (
    <div>
      <Navbar
        role="  Vice Dean Space "
        pic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAzf31hgJ8Gy5XvOVsBraLJuC6qA01Y-Kjkw&usqp=CAU"
        itemOne="Share Informations "
        itemTwo=" Add anonymity code "
        pathOne="/ViceD/SharingPost"
        pathTwo="/ViceD/posts "
      />
      <Outlet />
    </div>
  );
};

export default ViceD;
