import ProductItemAdmin from "./ProductItemAdmin";

const ProductListAdmin = ({ products }) => {
  return (
    <ul className="flex flex-col gap-y-12">
      {(products || []).map((product) => (
        <ProductItemAdmin key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default ProductListAdmin;
