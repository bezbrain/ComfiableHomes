import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  About,
  Cart,
  Products,
  SingleProductDetails,
  Checkout,
  Error,
  Payment,
} from "./pages";
import {
  Order,
  ProtectedRoute,
  SharedLayouts,
} from "./components/sharedLayouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClosedOrders, OpenOrders } from "./components/routes/orders";

function App() {
  const [isOrder, setIsOrder] = useState(true);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayouts />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />

            {/* Protected Route */}
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route
                path="products/:productId"
                element={<SingleProductDetails />}
              />
              <Route path="payment" element={<Payment />} />

              <Route path="orders" element={<Order />}>
                <Route path="open" element={<OpenOrders isOrder={isOrder} />} />
                <Route
                  path="closed"
                  element={<ClosedOrders isOrder={isOrder} />}
                />
              </Route>
            </Route>

            {/* 404 route */}
            <Route path="/*" element={<Error />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-center"
          theme="dark"
          toastStyle={{ marginInline: "10px", backgroundColor: "#005ae2" }}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
