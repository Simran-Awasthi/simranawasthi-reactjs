import axios from "axios";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
const intialState = {
  categories: [],
};

export const AppContext = createContext(intialState);
const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let res = await axios.get(
        "https://upayments-studycase-api.herokuapp.com/api/categories/",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpbXJhbmF3YXN0aGkwM0BnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vU2ltcmFuLUF3YXN0aGkiLCJpYXQiOjE2NTkyNzQxNTAsImV4cCI6MTY1OTcwNjE1MH0.fGWSwFialEzR8bHnwluySNu0KFsX44QTUaFa0qDU2Kg",
          },
        }
      );
      console.log(res.data);
      if (res.status == 200 && res.data) {
        setCategories(res.data.categories.map((e: any) => e.name));
      }
    };
    getData();
  }, [categories == []]);
  return (
    <AppContext.Provider value={{ categories }}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
