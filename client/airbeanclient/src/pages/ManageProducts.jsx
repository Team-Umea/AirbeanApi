import { useSelector } from "react-redux";
import ProductList from "../components/products/ProductList";
import MaxWidthWrapper from "../components/utils/MaxWidthWrapper";
import DebounceSearchBar from "../components/utils/DebounceSearchBar";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/api";
import { Loader2 } from "lucide-react";
import ProductListAdmin from "../components/products/ProductListAdmin";

const MangeProductsPage = () => {
  const isLoadingProducts = useSelector((state) => state.product.isLoading);
  const productList = useSelector((state) => state.product.products);

  const [renderedProducts, setRenderedProducts] = useState(productList);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: products,
    isLoading: isFetchingNewProducts,
    error,
  } = useQuery({
    queryFn: () => getProducts(searchQuery),
    queryKey: ["products", searchQuery],
    enabled: !!searchQuery || searchQuery === "",
  });

  useEffect(() => {
    setRenderedProducts(productList);
  }, [productList]);

  useEffect(() => {
    setRenderedProducts(products);
  }, [products]);

  useEffect(() => {
    if (renderedProducts && !error) {
      setIsLoading(false);
    }
  }, [renderedProducts]);

  const isPending = isLoadingProducts || isFetchingNewProducts || isLoading;

  return (
    <div>
      <div className="mx-auto w-[90%] max-w-5xl p-10">
        <h1 className="text-3xl font-bold text-amber-700">Administrera Produkter</h1>
        <p className="mt-4 text-lg font-medium text-gray-700">
          Välkommen till produktadministrationen! Här kan du hantera alla produkter i vårt
          sortiment. Lägg till, redigera eller ta bort produkter för att säkerställa att vårt utbud
          alltid är aktuellt och av högsta kvalitet. Se till att våra kunder alltid hittar sina
          favoriter!
        </p>
        <DebounceSearchBar
          setIsLoading={setIsLoading}
          onSearch={(searchInput) => setSearchQuery(searchInput)}
          className="mt-20"
        />
      </div>
      <MaxWidthWrapper classNameContainer="w-[90%] max-w-5xl px-10 pb-10 pt-4">
        {error ? (
          <h2>Ett fel uppstod vid hämtning av produkter</h2>
        ) : isPending ? (
          <div className="p-10! flex justify-center">
            <Loader2 className="h-10 w-10 animate-spin" />
          </div>
        ) : (
          <ProductListAdmin products={renderedProducts} />
        )}
      </MaxWidthWrapper>
    </div>
  );
};

export default MangeProductsPage;
