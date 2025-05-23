import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Modal from "../utils/Modal";
import { updateProductStockQuantity } from "../../api/api";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Form from "../utils/Form";
import FormInput from "../utils/FormInput";
import PrimaryButton from "../btn/PrimaryButton";
import { Loader2 } from "lucide-react";
import { setProduct } from "../../store/manageProductSlice";

const productStockQuantitySchema = z.object({
  stockQuantity: z
    .number("Lagerkvantitet måste vara ett nummer")
    .positive("Lagerkvantitet måste vara ett positivt nummer")
    .max(100000, "Du kan inte ha mer än 100 000 av denna vara i lager"),
});

const ProductStockQuantityFrom = () => {
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.manageProduct.product);
  const queryClient = useQueryClient();
  const formMehtods = useForm({
    resolver: zodResolver(productStockQuantitySchema),
    defaultValues: {
      stockQuantity: selectedProduct.stock_quantity,
    },
  });

  const { isPending } = formMehtods;

  const updateProductStockQuantityMutation = useMutation({
    mutationFn: updateProductStockQuantity,
    onSuccess: (data) => {
      toast.success(`Lager saldo för ${data.product_name} har uppdaterats`);
      Modal.close();
      queryClient.invalidateQueries(["manageProducts"]);
      dispatch(setProduct(null));
    },
    onError: (err) => {
      let errorMessage;

      console.log(err);

      switch (err.status) {
        case 401:
          errorMessage = "Din session har gått ut, logga in igen för att fortsätta";
          break;
        default:
          errorMessage = "Ett fel uppstod vid uppdatering av produkt, var snäll och försök igen";
          break;
      }

      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) =>
    updateProductStockQuantityMutation.mutate({ ...data, productId: selectedProduct.id });

  return (
    <FormProvider {...formMehtods}>
      <Form onSubmit={onSubmit} className="pt-0!">
        <FormInput name="stockQuantity" type="number" label="Antal i lager" className="mt-8!" />
        <PrimaryButton type="submit" className="mt-12!" disabled={isPending}>
          Uppdatera
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        </PrimaryButton>
      </Form>
    </FormProvider>
  );
};

export default ProductStockQuantityFrom;
