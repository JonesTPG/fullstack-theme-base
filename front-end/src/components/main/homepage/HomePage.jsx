import React, { useEffect } from "react";
import Feedback from "../../feedback/Feedback";
import Main from "../Main";

const HomePage = () => {
  useEffect(() => {
    const user = window.localStorage.getItem("theme-base-token")
    if (user) {
      // User found from localStorage
    }
  }, [])

  return (
      <Main pageName="Homepage" >
        <Feedback />
      </Main>
  );
}

export default HomePage