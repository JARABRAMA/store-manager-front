import { ProductDetails } from "./components/ProductDetails";
import { useCases } from "../../../di";
import { ErrorMessage } from "../../shared/components/ErrorMessage";
import { LoadingSpinner } from "../../shared/components/LoadingSpinner";
import { useProductDetail } from "../../shared/hooks/useProductDetail";
import { TopBar } from "../../shared/components/TopBar";
import { useNavigate } from "react-router";

export function ProductDetailScreen() {
  const { findByIdUseCase } = useCases;
  const { loading, error, product } = useProductDetail({
    findById: findByIdUseCase,
  });
  const navigate = useNavigate();
  const navigateToUpdateProduct = (productId: string) => {
    navigate(`/products/update/${productId}`);
  };
  return (
    <main className="flex flex-col flex-1 gap-2 bg-gray-900 text-gray-100  min-h-0">
      <TopBar title={"Detalles del producto"} navigateBack />
      {loading && !error && <LoadingSpinner />}
      {!loading && error && <ErrorMessage message={error} />}
      {!loading && !error && product && (
        <ProductDetails
          navigateUpdateProduct={navigateToUpdateProduct}
          product={product}
        />
      )}
    </main>
  );
}
