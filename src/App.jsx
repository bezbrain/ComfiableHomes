import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  About,
  Cart,
  Products,
  SingleProductDetails,
  Checkout,
  Error,
} from "./pages";
import { ProtectedRoute, SharedLayouts } from "./components/sharedLayouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
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
            </Route>

            {/* 404 route */}
            <Route path="/*" element={<Error />} />
          </Route>
        </Routes>
        <ToastContainer position="top-center" theme="dark" />
      </BrowserRouter>
    </>
  );
}

export default App;
