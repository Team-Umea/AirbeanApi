import { CircleCheck } from "lucide-react";
import { cn } from "../../lib/utitls";
import DefaultButton from "../btn/DefualtButton";
import coffeeBean from "../../assets/icons/coffee-bean.svg";
import coffeeBeanOutline from "../../assets/icons/coffee-bean-outline.svg";
import { useSelector } from "react-redux";
import { useState } from "react";

const ProductItem = ({ product }) => {
  const isInStock = product.stock_quantity > 0;
  let productsInCart = useSelector((state) => state.product.products).slice(0, 10);
  const [isInCart, setIsInCart] = useState(productsInCart.some((prod) => prod.id === product.id));

  const handleToggle = ({}) => {
    if (isInCart) {
      productsInCart = productsInCart.filter((prod) => prod.id !== product.id);
    } else {
      productsInCart.push(product);
    }

    setIsInCart(productsInCart.some((prod) => prod.id === product.id));
  };

  return (
    <li className="flex justify-between">
      <div className="flex flex-col md:flex-row items-start gap-y-2 justify-between">
        <div>
          <p className="text-lg font-semibold text-gray-700">{product.product_name}</p>
          <p>{product.product_info}</p>
        </div>
        <div className="flex md:flex-col items-start md:items-end gap-x-4">
          <p className="font-medium text-gray-700">{Math.round(product.cost)} SEK</p>
          <div className="flex items-center gap-x-1">
            <CircleCheck
              className={cn("h-4 w-4", { "text-green-600": isInStock, "text-red-600": !isInStock })}
            />
            {isInStock ? "I lager" : "Tillfälligt slut"}
          </div>
        </div>
      </div>
      <DefaultButton onClick={handleToggle}>
        {isInCart ? (
          <img aria-hidden="true" src={coffeeBean} alt="Coffee bean" className="w-8 h-8" />
        ) : (
          <img aria-hidden="true" src={coffeeBeanOutline} alt="Coffee bean" className="w-8 h-8" />
        )}
      </DefaultButton>
    </li>
  );
};

export default ProductItem;
