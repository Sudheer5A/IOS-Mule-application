import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const BlogContext = createContext();

const API = "http://localhost:8081/custom/api/v1/blog/getblogs";

export const BlogProvider = ({ children }) => {
  const [blogData, setBlogData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [login, setLogin] = useState([]);
  const [state, setState] = useState(false);

  useEffect(() => {
    axios
      .get(API)
      .then((res) => setBlogData(res.data))
      .catch((err) => console.log("getAPI" + err.message));
  }, [refresh]);

  return (
    <BlogContext.Provider
      value={{
        blogData,
        setRefresh,
        refresh,
        setLogin,
        login,
        state,
        setState,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
