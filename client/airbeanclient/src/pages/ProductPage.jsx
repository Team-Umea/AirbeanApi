import { useSelector } from "react-redux";
import ProductList from "../components/products/ProductList";
import MaxWidthWrapper from "../components/utils/MaxWidthWrapper";
import DebounceSearchBar from "../components/utils/DebounceSearchBar";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/api";
import { Loader2 } from "lucide-react";

const ProductPage = () => {
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
    if (products) {
      setRenderedProducts(products.sort((a, b) => b.total_orders - a.total_orders));
    }
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
        <h1 className="text-3xl font-bold text-amber-700"> Upptäck Din Nästa Kaffefavorit!</h1>
        <p className="mt-4! text-lg font-medium text-gray-700">
          Vår meny har något för alla kaffeälskare! Låt dig inspireras av våra unika och utsökta
          kaffesorter. Från klassiska bryggmetoder till innovativa smaker – din perfekta kopp väntar
          på dig!
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
          <ProductList products={renderedProducts} />
        )}
      </MaxWidthWrapper>
    </div>
  );
};

export default ProductPage;
