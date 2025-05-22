import { useDispatch, useSelector } from "react-redux";
import DefaultButton from "../btn/DefaultButton";
import { setProduct } from "../../store/manageProductSlice";
import { Circle, CircleCheck } from "lucide-react";

const ProductItemAdmin = ({ product }) => {
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.manageProduct.product);

  const isSelectedProduct = selectedProduct?.id === product.id;

  const handleToggle = () => {
    if (selectedProduct && isSelectedProduct) {
      dispatch(setProduct(null));
    } else {
      dispatch(setProduct(product));
    }
  };

  return (
    <li className="grid grid-cols-[1fr] grid-rows-[auto_auto_auto] sm:grid-cols-[2fr_1fr] sm:grid-rows-[1fr_1fr] lg:grid-cols-[1fr_2fr_1fr] lg:grid-rows-[1fr] lg:gap-x-6">
      <DefaultButton
        onClick={handleToggle}
        className="gap-2 mr-8! col-start-1 row-start-3 sm:col-start-2 sm:row-start-1 lg:col-start-1 lg:row-start-1 flex-shrink-0">
        {isSelectedProduct ? <CircleCheck absoluteStrokeWidth /> : <Circle absoluteStrokeWidth />}
      </DefaultButton>
      <div className="col-start-1 row-start-1 lg:col-start-2 lg:row-start-1">
        <p className="text-lg font-semibold text-gray-700">{product.product_name}</p>
        <p>{product.product_info}</p>
      </div>
      <div className="flex sm:flex-col items-start gap-x-4 col-start-1 row-start-2 lg:col-start-3 lg:row-start-1">
        <p className="font-medium text-gray-700">{Math.round(product.cost)} SEK</p>
        <p className="flex items-center gap-x-1">{product.stock_quantity} i lager</p>
      </div>
    </li>
  );
};

export default ProductItemAdmin;
