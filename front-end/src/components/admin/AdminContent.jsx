import React, { useEffect } from "react";
import UserSearch from "./usersearch/UserSearch";
import ItemList from "./itemlist/ItemList";
import { useRoles } from "../../hooks/auth";

const AdminContent = () => {
  let roles = useRoles();
  if (!roles || !roles.includes("ADMIN")) {
    return <p>you do not have permissions to access this page</p>;
  } else {
    return (
      <>
        <ItemList></ItemList>
        <UserSearch></UserSearch>
      </>
    );
  }
};
export default AdminContent;
