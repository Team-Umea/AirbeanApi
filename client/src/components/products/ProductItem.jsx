import { CircleCheck, CircleX } from "lucide-react";
import DefaultButton from "../btn/DefaultButton";
import coffeeBean from "../../assets/icons/coffee-bean.svg";
import coffeeBeanOutline from "../../assets/icons/coffee-bean-outline.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../../store/cartSlice";
import { toast } from "sonner";
import Badge from "../utils/Badge";

const ProductItem = ({ product, index }) => {
  const isInStock = product.stock_quantity > 0;
  const productsInCart = useSelector((state) => state.cart.items);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const dispatch = useDispatch();

  const [isInCart, setIsInCart] = useState(productsInCart.some((prod) => prod.id === product.id));

  useEffect(() => {
    setIsInCart(productsInCart.some((prod) => prod.id === product.id));
  }, [productsInCart]);

  const handleToggle = () => {
    if (isAdmin) {
      toast.error("Som admin kan du inte köpa kaffe");
      return;
    }

    if (isInCart) {
      dispatch(removeFromCart(product));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <li className="grid grid-cols-[1fr] grid-rows-[auto_auto_auto] sm:grid-cols-[2fr_1fr] sm:grid-rows-[1fr_1fr] lg:grid-cols-[1fr_2fr_1fr] lg:grid-rows-[1fr] lg:gap-x-6">
      {isInStock && (
        <DefaultButton
          onClick={handleToggle}
          className="gap-2 mr-8! col-start-1 row-start-3 sm:col-start-2 sm:row-start-1 lg:col-start-1 lg:row-start-1 flex-shrink-0">
          <div className="">
            <img
              aria-hidden="true"
              src={isInCart ? coffeeBean : coffeeBeanOutline}
              alt="Coffee bean"
              className="w-8 h-8 max-w-none"
            />
          </div>
          <p className="whitespace-nowrap">{isInCart ? "Ta bort" : "Lägg till"}</p>
        </DefaultButton>
      )}
      <div className="col-start-1 row-start-1 lg:col-start-2 lg:row-start-1">
        <div className="flex gap-x-2">
          <p className="text-lg font-semibold text-gray-700">{product.product_name}</p>
          {index === 0 && <Badge className="bg-amber-400">Kundens favorit</Badge>}
        </div>
        <p>{product.product_info}</p>
      </div>
      <div className="flex sm:flex-col items-start gap-x-4 col-start-1 row-start-2 lg:col-start-3 lg:row-start-1">
        <p className="font-medium text-gray-700">{Math.round(product.cost)} SEK</p>
        <div className="flex items-center gap-x-1">
          {isInStock ? (
            <CircleCheck className="h-4 w-4 text-green-500" />
          ) : (
            <CircleX className="h-4 w-4 text-red-500" />
          )}
          {isInStock ? "I lager" : "Tillfälligt slut"}
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
