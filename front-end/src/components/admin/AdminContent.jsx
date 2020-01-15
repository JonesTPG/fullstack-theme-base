import React from "react";
import UserSearch from "./usersearch/UserSearch";
import ItemList from "./itemlist/ItemList";

const AdminContent = () => {
  return (
    <>
      <ItemList></ItemList>
      <UserSearch></UserSearch>
    </>
  );
};

export default AdminContent;
