import { useSelector } from "react-redux";

const ProductPage = () => {
  const products = useSelector((state) => state.product.products);
  return <p>Meny</p>;
};

export default ProductPage;
