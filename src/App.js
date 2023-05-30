import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './css/TS/App.css';
import HeaderPage from "./pages/Ecommerce/Header";
import { CreateShop } from "./pages/Admin-panel/Products/Create/Create_shop.js";
import Home from "./pages/Ecommerce/HomePage";
import Error from "./pages/Ecommerce/Error";
import About from "./pages/Ecommerce/About";
import Contact from "./pages/Ecommerce/Contact";
import Search from "antd/es/transfer/search";
import { Dashboard, DashboardPage } from "./pages/Admin-panel/Dashboard/Dashboard";
import Login from "./pages/Ecommerce/Register/Login";
import { Products } from "./pages/Admin-panel/Products/Products";
import { ClientPage } from "./pages/Admin-panel/Clients/Clients";
import { Sales } from "./pages/Admin-panel/Sales/Sales";
import { Category } from "./pages/Admin-panel/Category/Category";
import { Supplier } from "./pages/Admin-panel/Supplier/Supplier";
import { Order } from "./pages/Admin-panel/Orders/Order";
import { Coupons } from "./pages/Admin-panel/Coupons/Coupons";
import Product_detail from "./pages/Admin-panel/Products/Detail/Product_detail";
import { Product_filter } from "./pages/Admin-panel/Products/Filter/Product_filter";
import { Sign_up } from "./pages/Ecommerce/Register/sign_up";
import { AuthProvider } from "./Utils/Auth/Auth";
import { PurchasePage } from "./pages/Admin-panel/Products/Detail/Purchase-page";
import { AdminPanel } from "./pages/Admin-panel/User-page/Admin-panel";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} errorElement={<Error />} />
      <Route exact path="/about" element={<About />} errorElement={<Error />} />
      <Route exact path="/contact" element={<Contact />} errorElement={<Error />} />
      <Route exact path="/search" element={<Search />} errorElement={<Error />} />
      <Route exact path="/dashboard" element={<Dashboard />} errorElement={<Error />} />
      <Route exact path="/sign-up" element={<Sign_up />} errorElement={<Error />} />
      <Route exact path="/login" element={<Login />} errorElement={<Error />} />
      <Route exact path="/admin-panel" element={<AdminPanel />} errorElement={<Error />} />
      <Route exact path="/dashboard/dashboardPage" element={<DashboardPage />} errorElement={<Error />} />
      <Route exact path="/dashboard/products" element={<Products />} errorElement={<Error />} />
      <Route exact path="/dashboard/clients" element={<ClientPage />} errorElement={<Error />} />
      <Route exact path="/dashboard/sales" element={<Sales />} errorElement={<Error />} />
      <Route exact path="/dashboard/category" element={<Category />} errorElement={<Error />} />
      <Route exact path="/dashboard/supplier" element={<Supplier />} errorElement={<Error />} />
      <Route exact path="/dashboard/order" element={<Order />} errorElement={<Error />} />
      <Route exact path="/dashboard/coupons" element={<Coupons />} errorElement={<Error />} />
      <Route exact path="/dashboard/products/create-shop" element={<CreateShop />} errorElement={<Error />} />
      <Route exact path="/dashboard/products/detail/:id" element={<Product_detail />} errorElement={<Error />} />
      <Route exact path="/dashboard/products/filter" element={<Product_filter />} errorElement={<Error />} />
      <Route exact path="/dashboard/products/purchase" element={<PurchasePage />} errorElement={<Error />} />
    </Routes>
  );
}

export default App;
