import { useSelector } from "react-redux";
import SecondaryButton from "../btn/SecondaryButton";
import { Plus } from "lucide-react";
import Modal from "../utils/Modal";

const ProductControlsAdmin = () => {
  const selectedProduct = useSelector((state) => state.manageProduct.product);

  const showModal = () => {
    Modal.open(
      ({ close }) => (
        <div>
          <p>hej</p>
          <form action=""></form>
        </div>
      ),
      "Skapa ny produkt"
    );
  };

  return (
    <div className="mt-16">
      {!selectedProduct && (
        <SecondaryButton onClick={showModal} className="w-fit">
          <span className="font-semibold">Ny produkt</span>
          <Plus />
        </SecondaryButton>
      )}
    </div>
  );
};

export default ProductControlsAdmin;
