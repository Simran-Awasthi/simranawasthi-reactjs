import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../hooks/AppProvider";

const AddProduct = () => {
  const [currentData, setCurrentData] = useState({
    name: "",
    description: "",
    avatar: "",
    category: "",
    price: "",
  });
  const { categories } = useContext(AppContext);
  let navigate = useNavigate();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCurrentData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let productData = {
      ...currentData,
      developerEmail: "simranawasthi03@gmail.com",
    };
    console.log(productData);
    e.preventDefault();
    let res = await axios.post(
      "https://upayments-studycase-api.herokuapp.com/api/products",
      productData,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpbXJhbmF3YXN0aGkwM0BnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vU2ltcmFuLUF3YXN0aGkiLCJpYXQiOjE2NTkyNzQxNTAsImV4cCI6MTY1OTcwNjE1MH0.fGWSwFialEzR8bHnwluySNu0KFsX44QTUaFa0qDU2Kg",
        },
      }
    );
    console.log(res);
    navigate("/");
  };
  return (
    <div className="flex flex-col justify-start items-center w-full">
      <form
        className="w-full flex flex-col max-w-md gap-4 "
        onSubmit={handleSubmit}
      >
        <p className="text-2xl font-semibold self-center ">Create Product</p>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={currentData.name}
          placeholder="Product name "
          className="bg-white rounded-md p-2 w-full shadow-sm drop-shadow-md"
        />
        <textarea
          onChange={handleChange}
          name="description"
          placeholder="Description "
          value={currentData.description}
          className="bg-white rounded-md p-2 w-full shadow-sm drop-shadow-md"
        />
        <input
          type="text"
          onChange={handleChange}
          name="avatar"
          placeholder="Image URL"
          value={currentData.avatar}
          className="bg-white rounded-md p-2 w-full shadow-sm drop-shadow-md"
        />
        <select
          name="category"
          id="category"
          placeholder="Categories"
          // defaultValue={"Categories"}
          value={currentData.category}
          onChange={(e) => {
            setCurrentData((data) => ({ ...data, category: e.target.value }));
          }}
          className=" bg-white first:text-gray-400 rounded-md pr-4 gap-4 flex p-2 group py-2 w-full shadow-sm drop-shadow-md "
        >
          <option hidden className=" group-focus:first:hidden text-neutral-400">
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

        <input
          type="number"
          onChange={handleChange}
          name="price"
          placeholder="Price"
          value={currentData.price}
          className="bg-white rounded-md p-2 w-full shadow-sm drop-shadow-md "
        />
        <button
          type="submit"
          className="bg-white rounded-md p-2 w-full font-bold shadow-sm drop-shadow-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default AddProduct;
