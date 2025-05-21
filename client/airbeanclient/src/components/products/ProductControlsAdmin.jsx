import { useSelector } from "react-redux";
import SecondaryButton from "../btn/SecondaryButton";
import { Plus } from "lucide-react";
import Modal from "../utils/Modal";

const ProductControlsAdmin = () => {
  const selectedProduct = useSelector((state) => state.manageProduct.product);

  const showModal = () => {
    Modal.open(({ close }) => (
      <div>
        <h2 className="text-xl font-semibold mb-4">My Modal</h2>
        <p>This is modal content.</p>
        <button onClick={close} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Close
        </button>
      </div>
    ));
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
