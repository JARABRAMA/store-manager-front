import { ProductDetails } from "./components/ProductDetails";
import { findByIdUseCase } from "../../../di";
import { ErrorMessage } from "../../shared/components/ErrorMessage";
import { LoadingSpinner } from "../../shared/components/LoadingSpinner";
import { useProductDetail } from "./useProductDetail";
import { TopBar } from "../../shared/components/TopBar";

export function ProductDetailScreen() {
  const { loading, error, product } = useProductDetail({
    findById: findByIdUseCase,
  });
  return ( 
    <main className="flex flex-col flex-1 gap-2 bg-gray-900 text-gray-100  min-h-0">
    <TopBar title={"Detalles del producto"} navigateBack /> 
      {loading && !error && <LoadingSpinner />}
      {!loading && error && <ErrorMessage message={error} />}
      {!loading && !error && product && <ProductDetails product={product} />}
    </main>
    
  );
}
