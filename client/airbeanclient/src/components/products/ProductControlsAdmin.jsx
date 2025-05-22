import { useDispatch, useSelector } from "react-redux";
import SecondaryButton from "../btn/SecondaryButton";
import { CircleX, Plus } from "lucide-react";
import Modal from "../utils/Modal";
import NewProductForm from "./NewProductForm";
import DangerButton from "../btn/DangerButton";
import DefaultButton from "../btn/DefaultButton";
import GhostButton from "../btn/GhostButton";
import { setProduct } from "../../store/manageProductSlice";
import AcceptModal from "../utils/AcceptModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../api/api";
import { toast } from "sonner";
import UpdateProductForm from "./UpdateProductForm";
import ProductStockQuantityFrom from "./ProductStockQuantityForm";

const ProductControlsAdmin = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const selectedProduct = useSelector((state) => state.manageProduct.product);

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["manageProducts"]);
      toast.success(`Produkt ${selectedProduct.product_name} har raderats`);
      dispatch(setProduct(null));
    },
    onError: () => {
      toast.error(
        `Kunde inte radera produkt ${selectedProduct.product_name}, var snäll och försök igen`
      );
    },
  });

  const showCreateProductModal = () => {
    Modal.open(
      () => (
        <div className="md:w-sm lg:w-md">
          <NewProductForm />
        </div>
      ),
      "Skapa ny produkt"
    );
  };

  const showUpdateProductModal = () => {
    Modal.open(
      () => (
        <div className="md:w-sm lg:w-md">
          <UpdateProductForm />
        </div>
      ),
      "Skapa ny produkt"
    );
  };

  const showUpdateProductStockQuantityModal = () => {
    Modal.open(
      () => (
        <div className="md:w-sm lg:w-md">
          <ProductStockQuantityFrom />
        </div>
      ),
      "Uppdatera lager saldo"
    );
  };

  const showAcceptDeleteProductModal = () => {
    AcceptModal.open(
      `Är du säker på att du vill radera ${selectedProduct.product_name}?`,
      "Radera produkt",
      () => {
        deleteProductMutation.mutate({ productId: selectedProduct.id });
      }
    );
  };

  const cancel = () => {
    dispatch(setProduct(null));
  };

  return (
    <div className="mt-16">
      {selectedProduct ? (
        <div className="flex flex-col items-start gap-y-4 lg:grid lg:grid-cols-[3fr_1fr]">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1fr_1fr] w-fit gap-4">
            <DangerButton onClick={showAcceptDeleteProductModal}>
              <span className="font-semibold">Radera produkt</span>
              <CircleX />
            </DangerButton>
            <GhostButton onClick={showUpdateProductModal}>Uppdatera</GhostButton>
            <GhostButton onClick={showUpdateProductStockQuantityModal}>Fyll på</GhostButton>
          </div>
          <SecondaryButton onClick={cancel}>Avbryt</SecondaryButton>
        </div>
      ) : (
        <SecondaryButton onClick={showCreateProductModal} className="w-fit">
          <span className="font-semibold">Ny produkt</span>
          <Plus />
        </SecondaryButton>
      )}
    </div>
  );
};

export default ProductControlsAdmin;
