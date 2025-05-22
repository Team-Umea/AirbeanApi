import { useDispatch, useSelector } from "react-redux";
import SecondaryButton from "../btn/SecondaryButton";
import { CircleX, Plus } from "lucide-react";
import Modal from "../utils/Modal";
import NewProductForm from "./NewProductForm";
import DangerButton from "../btn/DangerButton";
import DefaultButton from "../btn/DefaultButton";
import { setProduct } from "../../store/manageProductSlice";
import AcceptModal from "../utils/AcceptModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../api/api";
import { toast } from "sonner";

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

  const showModal = () => {
    Modal.open(
      () => (
        <div className="md:w-sm lg:w-md">
          <NewProductForm />
        </div>
      ),
      "Skapa ny produkt"
    );
  };

  const showAcceptModal = () => {
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
        <div className="flex justify-between">
          <div className="flex justify-center items-center gap-x-6">
            <DangerButton onClick={showAcceptModal}>
              <span className="font-semibold">Radera produkt</span>
              <CircleX />
            </DangerButton>
          </div>
          <DefaultButton onClick={cancel}>Avbryt</DefaultButton>
        </div>
      ) : (
        <SecondaryButton onClick={showModal} className="w-fit">
          <span className="font-semibold">Ny produkt</span>
          <Plus />
        </SecondaryButton>
      )}
    </div>
  );
};

export default ProductControlsAdmin;
