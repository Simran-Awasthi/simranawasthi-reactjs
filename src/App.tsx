import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import HomePage from "./pages/Home";
import ProductPage from "./pages/Products";
import AddProduct from "./pages/Products/AddProduct";
// import "./App.css";
function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="bg-neutral-200 w-full h-full min-h-screen min-w-full p-8">
      <div className="bg-white rounded-md p-4 flex justify-between my-8">
        <p className="font-bold italic">UPayments Store</p>
        <p className="font-bold italic">Register</p>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/products">
          <Route index element={<Navigate to="/"></Navigate>}></Route>
          <Route path="add" element={<AddProduct />}></Route>
          <Route path=":id" element={<ProductPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}
export default App;
