import { useSelector } from "react-redux";
import ProductList from "../components/products/ProductList";
import MaxWidthWrapper from "../components/utils/MaxWidthWrapper";

const ProductPage = () => {
  const products = useSelector((state) => state.product.products);

  return (
    <div>
      <div className="mx-auto w-[90%] max-w-5xl p-10">
        <h1 className="text-3xl font-bold text-amber-700"> Upptäck Din Nästa Kaffefavorit!</h1>
        <p className="mt-4! text-lg font-medium text-gray-700">
          Vår meny har något för alla kaffeälskare! Låt dig inspireras av våra unika och utsökta
          kaffesorter. Från klassiska bryggmetoder till innovativa smaker – din perfekta kopp väntar
          på dig!
        </p>
      </div>
      <MaxWidthWrapper classNameContainer="w-[90%] max-w-3xl p-10">
        <ProductList products={products} />
      </MaxWidthWrapper>
    </div>
  );
};

export default ProductPage;
