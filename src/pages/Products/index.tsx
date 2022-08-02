import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductPage = () => {
  let { id } = useParams<"id">();
  const [data, setData] = useState<any>(null);
  let navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      let res = await axios.get(
        "https://upayments-studycase-api.herokuapp.com/api/products/" + id,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpbXJhbmF3YXN0aGkwM0BnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vU2ltcmFuLUF3YXN0aGkiLCJpYXQiOjE2NTkyNzQxNTAsImV4cCI6MTY1OTcwNjE1MH0.fGWSwFialEzR8bHnwluySNu0KFsX44QTUaFa0qDU2Kg",
          },
        }
      );

      console.log(res.data);
      if (res.status == 200 && res.data) setData(res.data.product);
    };
    getData();
  }, []);
  const handleDelete = async () => {
    let res = await axios.delete(
      "https://upayments-studycase-api.herokuapp.com/api/products/" + id,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpbXJhbmF3YXN0aGkwM0BnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vU2ltcmFuLUF3YXN0aGkiLCJpYXQiOjE2NTkyNzQxNTAsImV4cCI6MTY1OTcwNjE1MH0.fGWSwFialEzR8bHnwluySNu0KFsX44QTUaFa0qDU2Kg",
        },
      }
    );
    if (res) {
      navigate("/");
    }
  };
  return (
    <main>
      {data != null && (
        <>
          <div className="flex w-full justify-start gap-4  h-full min-h-max items-stretch">
            <img
              src={data.avatar}
              alt={data.name}
              className=" w-full object-contain max-w-[200px] bg-white rounded-md p-2"
            />
            <div className="flex flex-col justify-between items-start w-full h-full min-h-full ">
              <h1 className="text-4xl font-bold pb-32 ">{data.name}</h1>

              <span className="font-semibold text-xl">$ {data.price}</span>
            </div>
          </div>
          <hr className="border-neutral-600 my-4 border-1.5" />
          <p className="font-bold  text-2xl py-1">Description</p>
          <div> {data.description}</div>
          <button
            onClick={handleDelete}
            className=" border  border-transparent bg-red-600 flex flex-col font-bold item-center rounded-md p-2 text-white justify-between hover:bg-red-900 foucs:outline-none focus:ring-2  focus:ring-red-300  motion-reduce:transformation-none  py-2 px-3 shadow-md  my-4 "
          >
            Delete
          </button>
        </>
      )}
    </main>
  );
};

export default ProductPage;
