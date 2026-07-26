import { Route, Routes } from "react-router";
import "./App.css";
import { FilterProductsScreen } from "./products/filter/FilterProductsScreeen";
import { NavigationBar } from "./shared/components/NavigationBar";
import { CreateNewProductScreen } from "./products/create/CreateNewProductScreen";
import { ProductDetailScreen } from "./products/details/ProductDetailScreen";
import { UpdateNewProductScreen } from "./products/update/UpdateProductScree";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashBoard />}></Route>
        <Route path="/products" element={<FilterProductsScreen />} />
        <Route path="/products/:productId?" element={<ProductDetailScreen />} />
        <Route path="/products/create" element={<CreateNewProductScreen />} />
        <Route
          path="/products/update/:productId?"
          element={<UpdateNewProductScreen />}
        />
      </Routes>
      <NavigationBar />
    </>
  );
}

function DashBoard() {
  return <p>DashBoard</p>;
}

export default App;
