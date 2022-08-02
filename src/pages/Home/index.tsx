import React, { useCallback, useContext, useEffect, useState } from "react";
import { FaPlus, FaSpinner, FaTimes } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import _ from "lodash";
import { AppContext } from "../../hooks/AppProvider";

const HomePage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const { categories } = useContext(AppContext);

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const getData = async () => {
      let res = await axios.get(
        "https://upayments-studycase-api.herokuapp.com/api/products",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpbXJhbmF3YXN0aGkwM0BnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vU2ltcmFuLUF3YXN0aGkiLCJpYXQiOjE2NTkyNzQxNTAsImV4cCI6MTY1OTcwNjE1MH0.fGWSwFialEzR8bHnwluySNu0KFsX44QTUaFa0qDU2Kg",
          },
        }
      );
      if (res.status == 200 && res.data) {
        setProducts(res.data.products);
        // setFilteredProducts(res.data);
      }
      console.log(res.data);
    };
    getData();
  }, [products == []]);
  const debounceSave = useCallback(
    _.debounce((val) => {
      console.log(val);
      let prods = products.filter((e: any) =>
        e.name.toLowerCase().includes(query.toLowerCase())
      );
      console.log(prods);
      setFilteredProducts([...prods]);
    }, 1000),
    [products, filteredProducts]
  );
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    e.preventDefault();
    setQuery(e.target.value);
    debounceSave(e.target.value);
  };
  return (
    <main className="flex flex-col justify-start items-center">
      <Link
        to="/products/add"
        className=" fixed bottom-10 right-10 h-16 w-16 rounded-full bg-black text-white grid justify-center items-center shadow-md drop-shadow-sm hover:drop-shadow-lg hover:shadow-xl"
      >
        <FaPlus size={28}></FaPlus>
      </Link>
      <div className="w-full flex justify-between">
        <div className="relative">
          <input
            type="text"
            className="bg-white rounded-md px-4 py-2 pr-14"
            placeholder="Apple Watch"
            value={query}
            onChange={handleQueryChange}
          />
          {!_.isEmpty(query) && (
            <button
              onClick={() => setQuery("")}
              className="w-6 h-6 text-sm bg-neutral-100 text-neutral-400 rounded-full grid justify-center items-center absolute top-[50%] translate-y-[-50%] right-5"
            >
              <FaTimes></FaTimes>
            </button>
          )}
        </div>

        <select
          name="category"
          id="category"
          placeholder="Categories"
          // defaultValue={"Categories"}
          value={selectedCategory ?? "Categories"}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          className=" bg-white rounded-md pr-4 gap-4 flex w-64 px-2 group"
        >
          <option hidden className=" group-focus:first:hidden">
            Categories
          </option>
          {categories.map((e) => {
            return (
              <option key={e} value={e}>
                {e}
              </option>
            );
          })}
        </select>
      </div>
      <div className="p-8 w-full max-w-screen-md">
        {products.length == 0 && (
          <FaSpinner className="animate-spin"></FaSpinner>
        )}
        {products.length > 0 && (
          <ul className="w-full grid grid-cols-4 gap-8">
            {query == ""
              ? products.map((e: any) => {
                  return <ProductTile e={e} key={e._id}></ProductTile>;
                })
              : filteredProducts.map((e: any) => {
                  return <ProductTile e={e} key={e._id}></ProductTile>;
                })}
          </ul>
        )}
        {filteredProducts.length}
      </div>
    </main>
  );
};

export default HomePage;

const ProductTile = ({ e }: { e: any }) => {
  return (
    <li className="flex flex-col gap-4">
      <Link to={`/products/${e._id}`}>
        <div className=" flex justify-center items-center rounded-md bg-white h-40 w-32 p-4">
          <img
            src={e.avatar}
            alt={e.name}
            className=" h-full w-full object-contain"
          />
        </div>

        <p className="p-1">{e.name}</p>
        <p className="self-center">${e.price}</p>
      </Link>
    </li>
  );
};
