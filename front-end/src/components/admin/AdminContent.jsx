import React, { useEffect } from "react";
import UserSearch from "./usersearch/UserSearch";
import Feed from "./feed/Feed";
import { useRoles } from "../../hooks/auth";

const AdminContent = () => {
  let roles = useRoles();
  if (!roles || !roles.includes("ADMIN")) {
    return <p>you do not have permissions to access this page</p>;
  } else {
    return (
      <>
        <Feed></Feed>
        <UserSearch></UserSearch>
      </>
    );
  }
};
export default AdminContent;
