import { useQuery } from "@apollo/react-hooks";
import { ME } from "../queries/login";

const useRoles = () => {
  const roles = null;
  useQuery(ME, {
    onCompleted({ data }) {
      console.log(data);
    }
  });

  return {
    roles
  };
};

const useToken = () => {
  const token = window.localStorage.getItem("theme-base-token");
  return {
    token
  };
};

export default { useRoles, useToken };
