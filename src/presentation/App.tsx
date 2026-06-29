import { Route, Routes } from "react-router";
import "./App.css";
import { FilterProductsScreen } from "./products/filter/FilterProductsScreeen";
import { NavigationBar } from "./shared/components/NavigationBar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashBoard />}></Route>
        <Route path="/products" element={<FilterProductsScreen />} />
      </Routes>
      <NavigationBar />
    </>
  );
}

function DashBoard() {
  return <p>DashBoard</p>;
}

export default App;
