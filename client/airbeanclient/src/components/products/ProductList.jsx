import ProductItem from "./ProductItem";

const ProductList = ({ products }) => {
  return (
    <ul className="flex flex-col gap-y-12">
      {(products || []).map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default ProductList;
