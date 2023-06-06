import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About";
import SharedLayouts from "./pages/SharedLayouts";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
import SingleProductDetails from "./pages/SingleProductDetails";

function App() {
  // const [isDisplay, setIsDisplay] = useState(true);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayouts />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/*" element={<Error />} />
            <Route
              path="products/:productId"
              element={<SingleProductDetails />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
