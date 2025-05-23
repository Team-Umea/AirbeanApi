import ProductItem from "./ProductItem";

const ProductList = ({ products }) => {
  return (
    <ul className="flex flex-col gap-y-12">
      {(products || []).map((product, index) => (
        <ProductItem key={product.id} product={product} index={index} />
      ))}
    </ul>
  );
};

export default ProductList;
