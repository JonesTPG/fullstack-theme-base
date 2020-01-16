import React from "react";
import Feed from "./feed/Feed";
import { useRoles } from "../../hooks/auth";
import { Route } from "react-router-dom";

const AdminContent = () => {
  let roles = useRoles();
  if (!roles || !roles.includes("ADMIN")) {
    return <p>you do not have permissions to access this page</p>;
  } else {
    return (
      <>
        <Route path="/admin/feedback" render={() => <Feed />} />
      </>
    );
  }
};
export default AdminContent;
